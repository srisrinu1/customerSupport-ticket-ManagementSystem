const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
require('dotenv').config()

const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    const authHeaders=req.headers.Authorization || req.headers.authorization;
    if(authHeaders && authHeaders.startsWith("Bearer")){
        token=authHeaders.split(" ")[1];
        jwt.verify(token,process.env.SECRET_ACCESS_TOKEN,(error,decoded)=>{
            if(error){
                res.status(401);
                throw new Error('User is not authorized');
            }
            console.log(decoded);
            req.user=decoded.user
        });

        if(!token){
            res.status(401);
            throw new Error('User is not authorized or Token is missing');
        }


    }
});

module.exports=validateToken;