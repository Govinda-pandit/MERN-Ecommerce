import { useState, useEffect } from "react"
import api from "../api/axios"
import { Link } from "react-router"

export default function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(res.data.products || [])
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  useEffect(() => {
    loadProduct()
  }, [search, category])



  const addtocart = async (productId) => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      alert("Please login to add item to cart")
      return
    }

    const res = await api.post("/cart/add", { userId, productId })
    const total = res.data.cart.items.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0
    )

    localStorage.setItem("cartTotal", total)
    window.dispatchEvent(new Event("cartUpdated"))
    alert("Item added to cart")

  }

  return (

    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center font-sans">

      {/* Header section with Search and Category side-by-side */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 w-full max-w-4xl justify-center items-center">
        {/* search */}
        <div className="relative flex-1 w-full">
          <input type="text"
            placeholder="Search products..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl border-none shadow-md focus:ring-2 focus:ring-blue-500 transition-all outline-none text-gray-700 bg-white"
          />
        </div>

        {/* category filter */}
        <div className="w-full md:w-48">
          <select name="category" id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-none shadow-md focus:ring-2 focus:ring-blue-500 transition-all outline-none cursor-pointer bg-white text-gray-700 font-medium"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* product grid - changed to a responsive grid system */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl px-4">
        {
          products.map((p) => (
            <Link
              key={p._id}
              to={`/products/${p._id}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 group flex flex-col overflow-hidden"
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4 h-60">
                <img src={p.image} alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h2 className="text-gray-800 font-bold text-lg mb-1 truncate">{p.title}</h2>
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <p className="text-blue-600 font-black text-xl">${p.price}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addtocart(p._id);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-black transition-all shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20 active:scale-95 flex items-center gap-2 group/btn cursor-pointer whitespace-nowrap"
                >
                  <svg className="w-4 h-4 transition-transform group-hover/btn:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        }
      </div>

    </div>
  )
}