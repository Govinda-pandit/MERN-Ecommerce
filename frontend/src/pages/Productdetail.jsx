import { useState, useEffect } from "react"
import api from "../api/axios"
import { useParams } from "react-router"


export default function Productdetail() {
  const { id } = useParams()
  const [product, setProduct] = useState("")

  const loadProduct = async () => {
    try {
      const res = await api.get("/products/")
      console.log(res.data)
      const allProduct = res.data.products.find((item) => item._id === id)
      setProduct(allProduct)

    }
    catch (error) {
      console.log(error, "it is server error")

    }
  }

  useEffect(() => {
    loadProduct()
  }, [])

  if (!product) {
    console.log("product not found")
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 max-w-2xl mx-auto mt-10">
      <img src={product.image} alt={product.title}
        className="w-full h-72 object-cover rounded-lg mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-semibold text-blue-600 mt-4">${product.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer">Add to cart</button>
    </div>
  )
}