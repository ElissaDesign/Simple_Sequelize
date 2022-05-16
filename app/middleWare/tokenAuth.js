const jwt = require('jsonwebtoken')


exports.TokenVerify = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    // const authHeader = req.headers['Authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.status(401).json("Please Login")
    }
    
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user
    const userAccess = req.body.email;
    const Forbidden = (user === userAccess)
    // console.log(Forbidden)
    if(Forbidden === false){
        return res.status(401).json("Update your account Only, This account is not yours")
    }
    next()
       
}