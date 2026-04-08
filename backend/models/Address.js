import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true

    },

    fullname: String,
    phoneNo: String,
    address: String,
    city: String,
    state: String,
    pincode: String, 
    

},{timestamps: true})

export default mongoose.model("Address" , addressSchema)