import Messages from "../models/messaage.js"
import User from "../models/user.model.js"
import AppError from "../utils/error.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
const send=async(req,res,next)=>{
    try{
            // console.log('req send',req);
        const {message}=req.body
        const {id}=req.params
        // console.log('id',id);
        const user=await User.findById(id)
        
        console.log('user detail from message',user);
        console.log('');
        const url=user.profile.secure_url
        const username=user.UserName
        const email=user.email
        const createMessage=await Messages.create({
            message,
            id,
            url,
            username,
            email,
            post:{
                public_id:email,
                // secureurl is  environment variable with api key,api secret
                secure_url:'cloudinary://378171611453713:jar_yV68UrVNSKbFbxleqoBxKJQ@dix9kn7zm'
            }
        })
        if(!createMessage){
            return next(
                new AppError('Error in posting message',400)
            )
        }
        console.log('before createMessage',createMessage);
        console.log(req.file);
        if(req.file){
        console.log('reacj 1');
            try{
                const result=await cloudinary.v2.uploader.upload(req.file.path,{
                    // at which folder you have to upload the image
                    folder:'lms',
                    width:250,
                    height:250,
                    // gravity is used to auto focus
                    gravity:'faces',
                    crop:'fill'
                })
                // try
                if(result){
                    console.log('reacj 2');
                    createMessage.post.public_id=result.public_id
                    createMessage.post.secure_url=result.secure_url    
                    console.log("URL IMAGE",result.secure_url);
                    
                    // remove file from local system/server
                    fs.rm(`uploads/${req.file.filename}`)

                }
            }catch(e){
                return next(
                    new AppError(e || 'File not uploaded,please try again',500)
                )
            }
        }
    

        await createMessage.save()
        res.status(201).json({
            success:true,
            message:'Message Posted successfully',
            createMessage
        })
    }
    
        catch(e){
            console.log(e);
        }
    
}

const allMessage=async(req,res,next)=>{
    try{
        const id=req.params.userId
        // $ne=not equal to
        const messages=await Messages.find({})
        
        res.status(200).json({
            success:true,
            message:'All Messages',
            messages
        })
    }
    catch(e){
        console.log(e);
    }

}
export {
    send,allMessage
}