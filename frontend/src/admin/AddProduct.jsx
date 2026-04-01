import axios from "../api/axios.js"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function AddProduct() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
    })

    const navigate = useNavigate()

    const handlechange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/products/add", form)
            alert("Product Added Successfully")
            navigate("/admin/productlist")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl transition-all hover:shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight">
                        Add New Product
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the details to upload a new product to your inventory.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handlesubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        {
                            Object.keys(form).map((key) => (
                                <div key={key}>
                                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize mb-1">
                                        {key}
                                    </label>
                                    <input
                                        id={key}
                                        name={key}
                                        type={key === 'price' || key === 'stock' ? 'number' : 'text'}
                                        required
                                        value={form[key]}
                                        onChange={handlechange}
                                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                                        placeholder={`Enter ${key}`}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Upload Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
