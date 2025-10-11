import mongoose from 'mongoose'
import "dotenv/config"

export const connectDB = async () => {
    try{
        const {MONGO_URL} = process.env
        if(!MONGO_URL) throw new Error("MONGOURL is not set")
        const conn = await mongoose.connect(MONGO_URL)
        console.log("mongodb connected",conn.connection.host)
    }catch(err){
        console.error("Error conecting to mongodb:",err)
        process.exit(1) //1 status code means fail , 0 means success
    }
}
