import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import AuthRoutes from "./routes/AuthRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/CartRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", AuthRoutes)
app.use("/api/products", productRouter)
app.use("/cart", cartRouter)

app.get("/", (req, res) => {
    res.send("it is my first get request manualy ready to use")
})


app.post("/", (req, res) => {
    res.send("it is my first post request manualy ready to use")
})

app.delete("/", (req, res) => {
    res.send("it is my first delete request manualy ready to use")
})

connectDB();
app.listen(5000, () => {
    console.log("server is running on port 5000 http://localhost:5000")
})