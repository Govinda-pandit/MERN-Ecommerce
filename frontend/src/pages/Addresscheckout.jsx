import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router"

export default function Addresscheckout() {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")

    const [form, setForm] = useState({
        fullname: "",
        phoneNo: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    })

    const handlechange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const saveAddress = async () => {
        try {
            const res = await api.post("/address/add", { ...form, userId })
            alert("Address saved successfully")
            if(!res){
                alert("Please fill all the fields")
                return
            }
            // window.dispatchEvent(new Event("addressUpdated"))
            navigate("/checkout")
        } catch (error) {
            console.error("Error saving address:", error)
        }
    }


    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b pb-4">
                Delivery address
            </h1>
            {
                Object.keys(form).map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={form[key]}
                        placeholder={key}
                        onChange={handlechange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                ))
            }

            <button
                onClick={saveAddress}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Save Address
            </button>
        </div>
    )

}