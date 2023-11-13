import mongoos from 'mongoose'


export const connectDB = async ()=>{
     try {
        await mongoos.connect(process.env.MONGODB_URI)
 
        console.log("Connect to MongoDB")
     } catch (error) {
        console.log( "MongoDB connection Error:",error)
     }
}