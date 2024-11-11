import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URL)
        .then(()=>{
            console.log("connected to db")
        })
        .catch((e)=>console.log(e))
}

export default connectDB