const mongooes=require("mongoose")
const connectDB=async()=>{
    try{
        await mongooes.connect(process.env.MONGODB_URI);
        console.log("mongoose connected")
    }catch(err){
        console.log("mongoose connect error",err)
        throw err;

    }
}
module.exports=connectDB
