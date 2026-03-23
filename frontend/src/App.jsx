import { createBrowserRouter, RouterProvider } from "react-router"

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Productdetail from "./pages/Productdetail"

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/Signup", element: <Signup /> },
    { path: "/Signin", element: <Signin /> },
    { path: "/Productdetail", element: <Productdetail /> },

])



export default function App() {
    return (
        <RouterProvider router={router} />
    )

}
