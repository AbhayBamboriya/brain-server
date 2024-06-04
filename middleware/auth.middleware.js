
import jwt from 'jsonwebtoken'
import AppError from '../utils/error.js';
const isLoggedIn = async (req,res,next)=>{
    try{
        // console.log("req",req.cookies);
        console.log('is logged in is there');
        // console.log(req);
        const {token}=req.cookies
        const {id}=req.params
        console.log(req.params);
        console.log('iddddddddd',id);
        //if(req.params)  let {id}=req.params
        console.log("token  form issloggrdin"+token);
        if(!token){
            return next(new AppError('Unauthenticated , please login again',405))
        }
        const userDetails=await jwt.verify(token,process.env.JWT_SECRET)
        console.log("userDetails from token"+JSON.stringify(userDetails));
        // const {idFromToken}=
        
        console.log('jwt',jwt);
        if (!userDetails) {

            return next(new AppError("Unauthorized, please login to continue", 401));
        }
        if(id!=userDetails.id){
            return next(new AppError('Unauthenticated , please login again',405))
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