import { useParams } from "react-router"

export default function Ordersuccess() {
    const { id } = useParams();

    const gohome = () => {
        window.location.href = "/"
    }

    return (

        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b pb-4">Order Success</h1>
            <p className="text-lg font-bold text-gray-900 dark:text-white">Order Id: {id}
                <button onClick={gohome}
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Continue shopping
                </button>
            </p>
        </div>


    )
}