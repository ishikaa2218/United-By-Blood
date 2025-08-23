const jwt = require('jsonwebtoken')
const key = "moonchild"

function jwtAuth(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token,key,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user;
        next();
    });
}

module.exports = jwtAuth;