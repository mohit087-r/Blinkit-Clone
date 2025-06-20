import mongoose from "mongoose"

if(!process.env.MONGODB_URL){
    throw new Error(
        'Please provide MONGODB_URL int the .env file'
    )
}


async function connectDb() {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected ✅')
    } catch (error) {
        console.log('Database connection failed ❌', error)
        process.exit(1)
    }
}

export default connectDb