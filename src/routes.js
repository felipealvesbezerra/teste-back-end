const Account = require('./models/account_schema')
const JWT = require('jsonwebtoken');
const express = require('express')
const bcrypt = require('bcryptjs');
const signAccessToken = require('./middlewares/auth/createToken');
const verifyAccessToken = require('./middlewares/auth/verifyToken');
const router = express.Router()

const response = (res, code, message) => {
    return res.status(code).send({message: message})
}

const dateValidation = (date) =>{
    const d = new Date(date)
    if(d.toString()==="Invalid Date") return false
    return d
}


router.post('/register', async (req, res) => {
    const { birth, userName, email } = req.body
    
    req.body.birth = dateValidation(birth)
    if(!req.body.birth) return response(res, 400, "Invalid Date, the date format must be YYYY-MM-DD.")


    if(await Account.findOne({userName: userName, email: email})){
        return response(res, 400, "this userName  {"+userName+"} has already been registered.")
    }

    const account = await Account.create(req.body).catch((err)=>{
        if(err.message.indexOf("E11000")!==-1) err.message = "This email has already been registered."
        return response(res, 500, err.message)
    })

    return response(res, 200, "New Account "+account.name+" has been successfully registered")

})

router.post('/login', async (req, res) => {
    
    const {userName, password} = req.body    
    const account = await Account.findOne({userName}).select('+password')
           
    if (!account || !(await bcrypt.compare(password, account.password)))
        return response(res, 200, 'Invalid credentials.')
    
    const accessToken = await signAccessToken(account._id).catch((err) => {
        return response(res, 500, err.message)
    }) 

    return res.status(200).send({message: account.userName+' successfully logged.', accessToken: accessToken})

})

router.get('/getAccount', verifyAccessToken, async (req, res) => {
    
    if (req.unauthorized) return response(res, 401, req.unauthorized)
    
    const account = await Account.findOne({ _id: req.payload._id }).catch((err) => {
        return response(res, 500, err.message)
    }) 
    return res.status(200).send({message: "successfully authenticated", account: account})
})

router.patch('/balanceR', verifyAccessToken, async (req, res) => {
    const {value} = req.query
    if(!value) return response(res, 400, 'Invalid query format/data')
    if (req.unauthorized) return response(res, 401, req.unauthorized)
    
    const account = await Account.findOneAndUpdate(
        { _id: req.payload._id },
        { $set: { lastUpdate: Date.now() }, $inc: { balance: value } },
        { new: true }
    ).catch((err) => {
        return response(res, 500, err.message)
    }) 
    

    return res.status(200).send({message: 'successfully successful recharge, the new balance is '+ account.balance})
})

router.patch('/uptadecart', verifyAccessToken, async (req, res) => {
    const {productList} = req.body
    if (productList.length<=0) return response(res, 400, "Body params is invalid or empty")
    if (req.unauthorized) return response(res, 401, req.unauthorized)

    var account = await Account.findOne({ _id: req.payload._id }).catch((err) => {
        return response(res, 500, err.message)
    })
    var error = false
    productList.forEach(p => {
        if (!p.quantity) p['quantity'] = 1
        var index = account.cart.findIndex(P => !P.title.localeCompare(p.title))
        if (index >= 0) {
            if (p.quantity > 0 || account.cart[index].quantity > (p.quantity*-1)) {
                account.cart[index].quantity += p.quantity
            } else if (account.cart[index].quantity === (p.quantity*-1)) {
                 account.cart.splice(index, 1)
            } else {
                error = true
                return null
            }
        } else {
            if (p.quantity < 0) {
                error = true
                return null
            }
            account.cart.push(p)
        }
    })

    if(error) return response(res, 400,"Is not possible remove this quantity of product of this cart")

    const result = await Account.findOneAndUpdate(
        { _id: req.payload._id },
        { $set: { cart: account.cart, lastUpdate: Date.now() } },
        { new: true }
    ).catch((err) => {
        return response(res, 500, err.message)
    })

    return res.status(200).send({message: "Cart updated successfully.", cart: result.cart})

})

router.put('/buy', verifyAccessToken, async (req, res) => {
    var {productList} = req.body
    if (req.unauthorized) return response(res, 401, req.unauthorized)
    
    var account = await Account.findOne({ _id: req.payload._id }).catch((err) => {
        return response(res, 500, err.message)
    })
    if(account.cart.length<=0) return response(res, 200, 'Cart is empty.')
    if (productList.length <= 0) {
        productList = account.cart
        account.cart = []
    }
    
    
    var total = 0, notFound = false, badReq = false
    productList.forEach((product)  => {
        if (!product.quantity || product.quantity <= 0)
            product['quantity'] = 1
        total += product.price * product.quantity
        console.log(total)
        console.log(account.cart.length>0)
        if (total <= account.balance) {
            if (account.cart.length>0) {
                console.log('truee')
                var index = account.cart.findIndex(p => p.title === product.title)
                if (index >= 0 && account.cart[index].quantity >= product.quantity) {
                    if (account.cart[index].quantity === product.quantity) {
                        account.cart.splice(index, 1)
                    } else {
                        account.cart[index].quantity -= product.quantity
                    }
                } else return notFound = true
            }else console. log('false')
        } else return console.log("no founds")
        
    })
    console.log(account.balance)
    console.log(total)

    if (badReq) return response(
            res, 400, "Body params is invalid or empty"
        )
    if (notFound) return response(
        res, 400, 'Product has not found or insufficient quantity on cart.'
    )
    account.balance -= total
    if (account.balance<0) return response(res, 200, 'Insufficient balance.')

    const result = await Account.findOneAndUpdate(
        { _id: req.payload._id },
        { $set: { cart: account.cart, lastUpdate: Date.now(), balance: account.balance }},
        { new: true }
    ).catch((err) => {
        return response(res, 500, err.message)
    })

    return res.status(200).send({
        message: 'successful purchase of all products.', account: result
    })

})

module.exports = router 
