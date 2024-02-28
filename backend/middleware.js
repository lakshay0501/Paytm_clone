
const {JWT_SECRET} = require('./config')
const JWT = require('jsonwebtoken')

const authMiddleWare = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(403).json({})
    }

    const token = authHeader.split(' ')[1]

    try{
       const decoded = JWT.verify(token,JWT_SECRET);

       req.userId = decoded.userId;

       next();
    } catch(err){
       return res.status(403).json({});
    }
}

module.exports = {
    authMiddleWare
}