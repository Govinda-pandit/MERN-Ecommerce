import { useState } from "react"
import { useNavigate } from "react-router"
import api from "../api/axios.js"

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [msg, setMsg] = useState("")
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
      const res = await api.post("/auth/login", form)
      console.log(res.data)
      //save token to localstorage
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data.user.id)
      // redirect to home page 
      setTimeout(() => {
        navigate("/")

      }, 1000);


    } catch (error) {
      setMsg(error.response?.data?.message || "An error occurred during login");
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Login To Your Account</h1>
          {msg &&
            <div className="text-red-500"> {msg}</div>
          }
          <form onSubmit={handlesubmit} className="flex flex-col gap-4">
            <input type="email" placeholder="Enter Your Email"
              name="email"
              value={form.email}
              onChange={handlechange}
              className="border border-gray-300 p-2 rounded-lg"
            />

            <input type="password" placeholder="Enter Your Password"
              name="password"
              value={form.password}
              onChange={handlechange}
              className="border border-gray-300 p-2 rounded-lg"
            />

            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Login</button>

          </form>
        </div>
      </div>
    </div>
  )

}