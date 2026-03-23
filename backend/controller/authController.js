import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const signupUser = async(req, res) => {
    try {
        const {name, email, password} = req.body

        const userexist = await User.findOne({email})

        if(userexist){
            return res.status(400).json({message: "User already registered"})
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashpassword
        })
        res.json({message: "User registered successfully"})
    } catch (error) {
        res.status(500).json({message: "Server Error" , error: error.message})
    }

}