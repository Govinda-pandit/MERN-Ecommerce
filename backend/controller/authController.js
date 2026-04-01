import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// it is for user signup
export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userexist = await User.findOne({ email })

        if (userexist) {
            return res.status(400).json({ message: "User already registered" })
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashpassword
        })
        res.json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }

}

// it is for user login
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        
        //it is user already exist or not 
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ message: "User not registered" })
        }

        //compare password 
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(400).json({message: "Invalid password"})
        }

        //generate token 
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "2d"}
        )

        res.json({message: "User logged in successfully", 
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })

    }
}