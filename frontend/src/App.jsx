import { createBrowserRouter, RouterProvider } from "react-router"

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Productdetail from "./pages/Productdetail"
import AddProduct from "./admin/AddProduct"
import EditProduct from "./admin/EditProduct"
import ProductList from "./admin/ProductList"


const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/Signup", element: <Signup /> },
    { path: "/Login", element: <Login /> },
    { path: "/products/:id", element: <Productdetail /> },

    //admin routes
    { path: "/admin/productlist", element: <ProductList /> },
    { path: "/admin/editproduct/:id", element: <EditProduct /> },
    { path: "/admin/addproduct", element: <AddProduct /> },

])



export default function App() {
    return (
        <RouterProvider router={router} />
    )

}
