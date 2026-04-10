import mongoose from "mongoose"

// import React from 'react'

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongoose db connected")
  }
  catch (error) {
    console.log(error.message)
  }
}

export default connectDB