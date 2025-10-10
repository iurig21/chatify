import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected",conn.connection.host)
    }catch(err){
        console.error("Error conecting to mongodb:",err)
        process.exit(1) //1 status code means fail , 0 means success
    }
}
