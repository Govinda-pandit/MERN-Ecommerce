import { useState } from "react";
import api from "../api/axios.js"

export default function Signup() {
    const [form, setform] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [msg, setmsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/signup", form);
            setmsg(res.data.message);
            setform({ name: "", email: "", password: "" });
        } catch (error) {
            setmsg(error.response?.data?.message || "An error occurred during signup");
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-2">
                    <h1 className="text-2xl font-bold">Create Account</h1>
                    {msg && (
                        <div className="text-red-500">{msg}</div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input type="text" name="name" placeholder="Name"
                            className="border border-gray-300 rounded-md p-2" 
                            value={form.name}
                            onChange={handleChange}
                            required
                            />
                        <input type="email" name="email" placeholder="Email"
                            className="border border-gray-300 rounded-md p-2"
                            value={form.email}
                            onChange={handleChange}
                            required />
                        <input type="password" name="password" placeholder="Password"
                            className="border border-gray-300 rounded-md p-2" 
                            value={form.password}
                            onChange={handleChange}
                            required/>
                        <button className="bg-blue-500 text-white rounded-md p-2">
                            SignUp</button>
                    </form>
                </div>
            </div>
        </div>
    )


}


