import product from "../models/Product.js"


// it is for create product
export const createproduct = async (req, res) => {
    try {
        const addproduct = await product.create(req.body)
        res.json({
            message: "Product created successfully",
            addproduct
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// it is for get all product 
export const getallproduct = async (req, res) => {
    try {

        const { search, category } = req.query
        const filter = {}

        if (search) {
            //case sensitive search
            filter.title = { $regex: search, $options: "i" }
        }

        if (category) {
            filter.category = category
        }

        const products = await product.find(filter).sort({ createdAt: -1 })
        res.json({
            message: "Product fetched successfully",
            products
        })
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// it is for update product
export const updateproduct = async (req, res) => {
    try {
        const update = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json({
            message: "Product updated successfully",
            update
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}


//it is for delete product 
export const deleteproduct = async (req, res) => {
    try {
        await product.findByIdAndDelete(
            req.params.id

        )
        res.json({
            message: "Product deleted successfully",

        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}