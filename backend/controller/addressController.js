import Address from "../models/Address.js"

export const saveAddress = async (req, res) => {
    try {
        // console.log("Body received:", req.body)  // Debugging ke liye
        const addressdata = await Address.create(req.body)
        res.json({ message: "Address saved successfully", addressdata })

    } catch (err) {
        console.log("Save Error:", err.message)  // Error dekho
        res.status(500).json({ message: "It is a server error", err })
    }
}

export const getAddress = async (req, res) => {
    try {
        // console.log("userId received:", req.params.userId)   // Step 1: ID aa rahi hai?
        const address = await Address.find({ userId: req.params.userId })
        // console.log("Addresses found:", address)              // Step 2: DB se kya aaya?
        res.json(address)
    } catch (error) {
        res.status(500).json({ message: "It is a server error", err })

    }
}