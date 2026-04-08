import { useState, useEffect } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router"


export default function Cart() {
    const userId = localStorage.getItem("userId")
    const [cart, setCart] = useState(null)
    const navigate = useNavigate()

    const loadCart = async () => {
        if (!userId) return
        try {
            const res = await api.get(`/cart/${userId}`)
            setCart(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadCart()
    }, [])


    //remove item from cart 
    const removeitem = async (productId) => {
        await api.post("/cart/remove", { userId, productId })
        loadCart()
        window.dispatchEvent(new Event("cartUpdated"))
    }

    const updateQuantity = async (productId, quantity) => {
        if (quantity === 0) {
            await removeitem(productId)
            return
        }

        await api.post("/cart/update", { userId, productId, quantity })
        loadCart()
        window.dispatchEvent(new Event("cartUpdated"))
    }

    if (!cart || cart.items.length === 0)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 rounded-3xl mx-4 my-8 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl border border-gray-100 dark:border-gray-800">
                <div className="w-24 h-24 mb-8 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center animate-bounce duration-3s">
                    <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tighter">Your Bag is Empty</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-sm text-lg leading-relaxed">Give it some love! Explore our latest collections and find something extraordinary today.</p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/25 active:scale-95 cursor-pointer uppercase tracking-widest text-sm"
                >
                    Discover Products
                </button>
            </div>
        )

    const total = cart?.items?.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0) || 0

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b pb-4">Your Cart</h1>

            {
                cart.items.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-sm text-lg leading-relaxed">Your cart is empty</p>
                ) : (
                    <div className="space-y-6">
                        {
                            cart.items.map((item) => (
                                <div key={item.productId._id} className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border dark:border-gray-700">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img src={item.productId.image}
                                            alt={item.productId.title} 
                                            className="w-full h-full object-contain rounded-lg"/>
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.productId.title}</h2>
                                        <p className="text-gray-500 dark:text-gray-400">${item.productId.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold hover:bg-indigo-600 hover:text-white transition-all shadow active:scale-90"
                                            onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>- </button>
                                        <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                                        <button 
                                            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold hover:bg-indigo-600 hover:text-white transition-all shadow active:scale-90"
                                            onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}> +</button>
                                    </div>
                                    <div className="min-w-[100px] text-center md:text-right">
                                        <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">${(item.productId.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <button 
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        onClick={() => removeitem(item.productId._id)}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))
                        }
                        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-6">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-widest uppercase">
                                Total Amount: <span className="text-indigo-600 ml-2">${total.toFixed(2)}</span>
                            </h2>
                            <button 
                            onClick={()=> navigate("/address")}
                            className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm">
                                Checkout Now
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}