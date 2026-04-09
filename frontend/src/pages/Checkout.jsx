import { useState, useEffect } from "react"
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
    const userId = localStorage.getItem("userId")
    const [address, setAddress] = useState([]);
    const [selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userId) {
            navigate("/")
        }
        api.get(`/cart/${userId}`).then((res) => { setCart(res.data) })
        api.get(`/address/${userId}`).then((res) => {
            setAddress(res.data)
            setSelectAddress(res.data[0]) //default to select first address
        })

    }, [])

    if (!cart) {
        return <div>Loading....</div>
    }

    const total = cart.items.reduce((sum, i) =>
        sum + i.quantity * i.productId.price, 0
    )

    const placeorder = async () => {
        if (!selectAddress) {
            alert("Please Select Address")
            return;
        }

        const res = await api.post("/order/place", {
            userId,
            address: selectAddress
        })

        if (res.status === 201) {
            navigate(`/order/success/${res.data.orderId}`)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b pb-4">Checkout</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-4">Select Address</h2>
            {
                address.map((addr) => (

                    <label key={addr._id}>
                        <input type="radio"
                            name="address"
                            checked={selectAddress?._id === addr._id}
                            onChange={() => setSelectAddress(addr)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <strong className="text-lg font-bold text-gray-900 dark:text-white">{addr.fullname}</strong>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{addr.phoneNo}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{addr.address}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{addr.city}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{addr.state}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{addr.pincode}</p>
                    </label>
                ))
            }
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-4">Order Summary</h2>
            <p className="text-lg font-bold text-gray-900 dark:text-white">Total Amount: ${total}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={placeorder}
            >Place Order (COD)</button>
        </div>
    )
}