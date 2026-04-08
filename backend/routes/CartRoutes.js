import express from "express"

import {
    addtocart,
    removetocart,
    updatequantity,
    getusercart
} from "../controller/cartController.js"

const router = express.Router()

router.post('/add', addtocart)
router.post('/remove', removetocart)
router.post('/update', updatequantity)
router.get('/:userId', getusercart)

export default router