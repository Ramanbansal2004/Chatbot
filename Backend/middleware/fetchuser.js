var jwt = require('jsonwebtoken');
const jwt_token = 'ramfdikf';
const fetchuser = (req, res, next) =>{
    const token =req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Invalid token"})
    }
    try {
        const data = jwt.verify(token, jwt_token)
        req.user= data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "Invalid token"})
    }
}

module.exports = fetchuser;