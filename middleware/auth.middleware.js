
import jwt from 'jsonwebtoken'
import AppError from '../utils/error.js';
const isLoggedIn = async (req,res,next)=>{
    try{
        // console.log("req",req.cookies);
    const {token}=req.cookies
    console.log("token "+token);
    if(!token){
        return next(new AppError('Unauthenticated , please login again',405))
    }
    const userDetails=await jwt.verify(token,process.env.JWT_SECRET)
    console.log("userDetails"+userDetails);
    console.log('jwt',jwt);
    if (!userDetails) {

        return next(new AppError("Unauthorized, please login to continue", 401));
    }
    req.user=userDetails
    
    next()
    }
    catch(e){
        console.log(e.message);
    }
}



export{
    isLoggedIn,
}