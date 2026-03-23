import mongoose from "mongoose"

// import React from 'react'

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("mongoose db connected")
  }
  catch (error) {
    console.log(error.message)
  }
}

export default connectDB