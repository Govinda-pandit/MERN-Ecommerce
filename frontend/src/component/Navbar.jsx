import { Link, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import api from "../api/axios.js"

export default function Navbar() {
    const navigate = useNavigate()
    const [cartcount, setCartcount] = useState(null)
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        const loadcart = async () => {
            if (!userId) return setCartcount(0)
            try {
                const res = await api.get(`/cart/${userId}`)

                const total = res.data.items.reduce(
                    (sum, item) => sum + item.quantity, 0
                )
                setCartcount(total)
            } catch (err) {
                console.log(err)
            }
        }
        loadcart()

        window.addEventListener("cartUpdated", loadcart)
        return () => window.removeEventListener("cartUpdated", loadcart)
    }, [userId])

    const logout = () => {
        localStorage.clear()
        setCartcount(0)
        navigate("/login")

    }

    return (
        <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
            <Link to="/" className="text-xl font-bold">Govinda Store</Link>
            <div className="flex gap-4">
                <Link to="/cart" className="">Cart🛒
                    {
                        cartcount > 0 && <span 
                        className="bg-red-500 text-white px-2 rounded-full">
                            {cartcount}
                        </span>}
                </Link>

                {
                    !userId ? (
                        <>
                            <Link to="/login" className="hover:text-gray-400">Login</Link>
                            <Link to="/signup" className="hover:text-gray-400">SignUp</Link>
                        </>

                    ) : (
                        <button onClick={logout} className="hover:text-gray-400">Logout</button>
                    )
                }
            </div>
        </nav>
    )
}