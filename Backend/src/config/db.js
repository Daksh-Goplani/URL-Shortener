import mongoose from 'mongoose'
import config from './config.js'

async function connectDB() {

    try {
        const conn = await mongoose.connect(config.MONGO_URI)
        console.log("connected to db")

    } catch (err) {
        console.log('error connecting to db', err)
        process.exit(1)
    }
}

export default connectDB