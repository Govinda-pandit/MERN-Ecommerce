import { createBrowserRouter, RouterProvider, Outlet } from "react-router"

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Productdetail from "./pages/Productdetail"
import AddProduct from "./admin/AddProduct"
import EditProduct from "./admin/EditProduct"
import ProductList from "./admin/ProductList"
import Navbar from "./component/Navbar"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import SaveAddress from "./pages/Addresscheckout"
import Ordersuccess from "./pages/OrderSuccess"

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/Signup", element: <Signup /> },
            { path: "/Login", element: <Login /> },
            { path: "/products/:id", element: <Productdetail /> },

            //admin routes
            { path: "/admin/productlist", element: <ProductList /> },
            { path: "/admin/editproduct/:id", element: <EditProduct /> },
            { path: "/admin/addproduct", element: <AddProduct /> },
            

            { path: "/cart", element: <Cart />},

            // address routes
            {path: "/address", element: <SaveAddress />},
            {path: "/checkout", element: <Checkout />},

            //order success
            {path: "/order/success/:id", element: <Ordersuccess />}
        
        ]
    }

])



export default function App() {
    return (
        <RouterProvider router={router} />
    )

}
