import mongoose from "mongoose";

mongoose.set('strictQuery',false)

const connectionToDB=async()=>{
    try{
        // it will proide a instance
        const {connection}=await mongoose.connect(
            process.env.MONGO_URL
        )
        if(connection){
            console.log(`Connected to mongo DB: ${connection.host}`);
        }
        
    }
    catch(e){
        console.log(e);
        // forcefully exit
        process.exit(1);
    }
}

export default connectionToDB