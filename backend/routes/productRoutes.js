import express from "express"
import {
    createproduct,
    getallproduct,
    updateproduct,
    deleteproduct

} from "../controller/productController.js"

const router = express.Router()

// it is for create product
router.post("/add", createproduct)

// it is for get all product 
router.get("/", getallproduct)

// it is for update product by id 
router.put("/update/:id", updateproduct)

// it is for delete product by id
router.delete("/delete/:id", deleteproduct)

export default router