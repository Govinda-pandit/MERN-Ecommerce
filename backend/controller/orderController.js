import Order from "../models/Order.js"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"


export const createOrder = async (req, res) => {
    try {
        const { userId, address } = req.body

        //get order items from cart
        const cart = await Cart.findOne({ userId }).populate("items.productId")
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "internal server error" })
        }

        //Prepare of order items
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }))

        //calculate total amount
        const totalAmount = cart.items.reduce((total, item) =>
            total + (item.productId.price * item.quantity), 0)

        //deduct in this product 
        for (let item of cart.items) {
            await Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity } })
        }

        //create order
        const order = new Order({
            userId,
            address,
            items: orderItems,
            totalAmount,
            paymentMethod: "COD"
        })


        await order.save()

        // clear cart
        await Cart.findOneAndDelete({ userId })
        res.status(201).json({ message: "order created successfully", orderId: order._id })


    } catch (error) {
        console.error("Error creating order:", error)
        res.status(500).json({ message: "Internal server error" })

    }
}