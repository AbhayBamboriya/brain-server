import mongoose, { Schema,Model } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from 'crypto'
const userSchema =  new Schema({
    UserName:{
        type:'String',
        require:[true,'UserName is Required'],
        minLength:[1,'UserName must at least 5 character'],
        maxLength:[50,'UserName must cantain less than 50 character'],
        lowercase:true,
        trim:true,
        unique:true
    },
    Name:{
        type:'String',
        require:[true,'Name is Required'],
        // minLength:[1,'Name must at least 5 character'],
        // maxLength:[50,'Name must cantain less than 50 character'],
        lowercase:true,
        trim:true,
    },
    email:{
        type:'String',
        requried:[true,'Email is required'],
        lowercase:true,
        trim:true,
        unique:true,
        
    },
    password:{
        type:'String',

        reqired:[true,'Password is Required'],
        minLength:[3,'Password must contain at least minimum 3 character'],
        select:false
        // password will not be shared by default
    },

    profile:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },

    forgotPasswordToken:String,
    forgotPasswordExpiry:Date  ,
    },{
    timestamps:true     
    }
)
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password=await bcrypt.hash(this.password,12)
})

userSchema.methods = {
generateJWTToken: async function(){
    return await jwt.sign(
        {userName:this.userName,id:this._id ,email:this.email},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRY,
        }
    )
},
comparePassword: async function(plaintextPassword){
    return await bcrypt.compare(plaintextPassword,this.password)

},
generatePasswordResetToken:async function(){
    // it will generate random token
    // directly used library
    const resetToken=crypto.randomBytes(20).toString('hex')
    this.forgotPasswordToken=crypto
    // converting reset token to encrypted form// ;
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    this.forgotPasswordExpiry=Date.now()+15*60*1000 //15 min from now
    return resetToken
}
}



const User = mongoose.model('User2',userSchema)
export default User