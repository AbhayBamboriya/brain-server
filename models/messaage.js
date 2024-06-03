import mongoose, { Schema,Model } from "mongoose";
const messageSchema=mongoose.Schema({
    
    id:{
        type:String,
        unique:true
    },
    message:{
        type:String
    },
    url:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    post:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },



})

const Messages=mongoose.model('Message',messageSchema)
export default Messages