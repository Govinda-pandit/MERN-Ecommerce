import { useState, useEffect } from "react"
import api from "../api/axios.js"
import { Link } from "react-router"

export default function ProductList() {
    const [products, setProducts] = useState([])

    const loadProducts = async () => {
        try {
            const res = await api.get("/products")
            setProducts(res.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
            try {
                await api.delete(`/products/delete/${id}`)
                alert("Product deleted successfully")
                loadProducts()
            }
        catch (error) {
            console.log("server error", error)
        }

    }

    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto backdrop-blur-sm bg-white/80 p-8 rounded-3xl shadow-2xl border border-white/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            Product Inventory
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Manage all your shop products in one place.</p>
                    </div>
                    <Link 
                        to="/admin/addproduct" 
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200"
                    >
                        <span className="mr-2">+</span> Add New Product
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Product Details</th>
                                <th className="px-6 py-4 text-center text-xs font-black text-gray-500 uppercase tracking-widest">Price</th>
                                <th className="px-6 py-4 text-center text-xs font-black text-gray-500 uppercase tracking-widest">Stock</th>
                                <th className="px-6 py-4 text-right text-xs font-black text-gray-500 uppercase tracking-widest">Management</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {products?.map((product) => (
                                <tr key={product._id} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                <img 
                                                    src={product.image || 'https://via.placeholder.com/150'} 
                                                    alt={product.title} 
                                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{product.title}</div>
                                                <div className="text-xs text-gray-500">{product.category || 'Uncategorized'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="text-sm font-black text-indigo-600">₹{product.price}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.stock} Units
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3">
                                            <Link 
                                                to={`/admin/editproduct/${product._id}`}
                                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 p-2 rounded-lg hover:bg-indigo-200 transition-all shadow-sm"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => deleteProduct(product._id)}
                                                className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-lg hover:bg-red-200 transition-all shadow-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {products?.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 font-medium">No products found in your inventory.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}