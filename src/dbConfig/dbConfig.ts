import mongoose from "mongoose"
const MONGO_URL="mongodb+srv://charliesuman:oq1HK1wA0DAUiuCJ@auth.rwgkg.mongodb.net/?retryWrites=true&w=majority&appName=auth"

export async function connect()
{
    try {
        mongoose.connect(MONGO_URL)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDB connected")
        })
        connection.on('error',(err)=>{
            console.log("mongo connection error, make sure db is up and running",err)
            process.exit(1)
        })
    } catch (error) {
        console.log("failed connecting with DB")
        console.log(error)
    }
}