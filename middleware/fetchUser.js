const JWT_SECRET = "Amaanisthename"
const jwt = require('jsonwebtoken')
// const { ResultWithContext } = require('express-validator/src/chain');

const fetchuser = (req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.send(401).send({error: "Please authenticate using a valid token"})

    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;    
        next()
    }
    catch (error){
        res.status(401).send({error: "Please authenticate with valid token"})
    }
}


module.exports = fetchuser;
