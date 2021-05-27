const JWT = require('jsonwebtoken');

const signAccessToken = (userId) =>{
    return new Promise((resolve, reject) => {
        const payload = {_id: userId}
        const secret = process.env.JWT_KEY
        const options = {
            expiresIn: "2h",
            issuer: "localhost:4000/api",
        }
        JWT.sign(payload, secret, options, (err, token)=>{
            if(err){
                console.log(err.message)
                reject(err)
            }
            resolve(token)
        })
    })
}

module.exports = signAccessToken 