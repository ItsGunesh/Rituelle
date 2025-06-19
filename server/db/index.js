import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from 'dotenv'


const connectDB = async ()=>{
  // console.log(process.env.MONGODB_URI)
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MONGODB connected successfully !!!")
      } catch (error) {
        console.error("MONGODB CONNECTION ERROR:" , error)
        process.exit(1)
      }
}

export default connectDB