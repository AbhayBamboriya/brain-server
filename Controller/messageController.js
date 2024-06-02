import Messages from "../models/messaage.js"
import User from "../models/user.model.js"
import AppError from "../utils/error.js"

const send=async(req,res,next)=>{
    const {message}=req.body
    const {id}=req.params
    console.log('id',id);
    if(!message){
        return next(
            new AppError('All fields are required',400)
        )
    }
    const user=await User.findById(id)
        
    console.log('user detail from message',user);
    const url=user.profile.secure_url
    const username=user.UserName
    const email=user.email
    const createMessage=await Messages.create({
        message,
        id,
        url,
        username,
        email
    })
    if(!createMessage){
        return next(
            new AppError('Error in posting message',400)
        )
    }
    console.log('before createMessage',createMessage);
    await createMessage.save()
    res.status(201).json({
        success:true,
        message:'Message Posted successfully',
        createMessage
    })
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