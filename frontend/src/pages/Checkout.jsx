import { useState, useEffect } from "react"
import api from "../api/axios"

export default function Checkout() {
    const userId = localStorage.getItem("userId")
    const [address, setAddress] = useState([])
    const [cart, setCart] = useState(null)

    useEffect(() => {
        api.get(`/cart/${userId}`).then((res) => { setCart(res.data) })
        api.get(`/address/${userId}`).then((res) => { setAddress(res.data) })

    }, [])

    if (!cart) {
        return <div>Loading....</div>
    }

    const total = cart.items.reduce((sum, i) =>
        sum + i.quantity * i.productId.price, 0
    )

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b pb-4">Checkout</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-4">Select Address</h2>
            {
                address.map((addr) => (
                    <div
                        key={addr._id}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border dark:border-gray-700"

                    >
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{addr.fullname}</p>
                        <p className="text-gray-500 dark:text-gray-400">{addr.phoneNo}</p>
                        <p className="text-gray-500 dark:text-gray-400">{addr.address}</p>
                        <p className="text-gray-500 dark:text-gray-400">{addr.city}</p>
                        <p className="text-gray-500 dark:text-gray-400">{addr.state}</p>
                        <p className="text-gray-500 dark:text-gray-400">{addr.pincode}</p>

                    </div>

                ))
            }
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-4">Order Summary</h2>
            <p className="text-lg font-bold text-gray-900 dark:text-white">Total Amount: ${total}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Place Order (COD)</button>
        </div>


    )
}