const JWT = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) =>{
    if(!req.headers['authorization']){
        req.unauthorized = 'TOKEN HEADER NOT FOUD!'
        return next()
    } 
    const barerToken = req.headers['authorization'].split(' ')
    const token = barerToken[1]
    JWT.verify(token, process.env.JWT_KEY, (err, payload) => {
        if(err){
            req.unauthorized = "unauthorized, "+err
            return next()
        }
        req.unauthorized = false
        req.payload = payload
        next()
    })
 
}



module.exports = verifyAccessToken

//module.exports = Promise  