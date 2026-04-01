import Cart from "../models/Cart.js"


// add to cart ke liye function
export const addtocart = async (req, res) => {
    try {
        const { userId, productId } = req.body
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({
                userId, items: [
                    { productId, quantity: 1 }
                ]
            })
        }
        else {
            const item = cart.items.find(
                i => i.productId.toString() === productId
            )

            if (item) {
                item.quantity += 1
            }
            else {
                cart.items.push({ productId, quantity: 1 })
            }
        }

        // if (item) {
        //     item.quantity += 1
        // }
        // else {
        // cart.items.push({ productId, quantity: 1 })
        // }

        await cart.save()
        res.json({
            message: "Item added to cart",
            cart
        })


    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}


// remove karne liye api
export const removetocart = async (req, res) => {
    try {
        const { userId, productId } = req.body
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            res.status(404).json({ message: "product not found" })
        }
        const item = cart.items.find(
            i => i.productId.toString() === productId
        )

        await cart.save()
        res.json({
            message: "Item are removed by cart ",
            cart
        })


    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })

    }
}


// upadate item quantity in cart
export const updatequantity = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({message: "product not found"})
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        )

        if(!item){
            return res.status(404).json({message: "product not found"})
        }

        item.quantity = quantity

        await cart.save(

        )
        res.json({
            message: "Item quantity updated",
            cart
        })

    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })

    }
}


// get user cart 
export const getusercart = async (req, res) => {
    try{
        const {userId} = req.params
        const cart = await Cart.findOne({userId}).populate('item.productId')

        res.json(cart)
    }
    catch(err){
        res.status(500).json({message: "Server Error", error: err.message})
    }
}