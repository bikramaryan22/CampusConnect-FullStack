import { useEffect, useState } from "react"
import axios from "axios"

function FeePortal() {

  const [fees, setFees] = useState([])
  const [studentId, setStudentId] = useState(null)

  const fetchFees = (id) => {

    axios
      .get(
        `https://campusconnect-fullstack.onrender.com/fees/${id}`
      )
      .then((res) => {

        setFees(res.data)

      })

  }

  useEffect(() => {

    const token =
      localStorage.getItem("token")

    axios.get(
      "https://campusconnect-fullstack.onrender.com/my-profile",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )
    .then((res) => {

      setStudentId(res.data.id)

      fetchFees(
        res.data.id
      )

    })

  }, [])

const payFee = async (fee) => {

  try {

    const orderResponse = await axios.post(
      `https://campusconnect-fullstack.onrender.com/create-order/${fee.id}`
    )

    const order = orderResponse.data

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: order.amount,

      currency: order.currency,

      name: "CampusConnect",

      description: fee.fee_type,

      order_id: order.id,

      handler: async function () {

        await axios.put(
          `https://campusconnect-fullstack.onrender.com/fees/pay/${fee.id}`
        )

        alert("Payment Successful!")

        fetchFees(studentId)

      },

      theme: {

        color: "#2563eb"

      }

    }

    const razorpay = new window.Razorpay(options)

    razorpay.open()

  }

  catch (err) {

    console.log(err)

    alert("Unable to start payment.")

  }

}

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        💰 Fee Portal
      </h1>

      <div className="grid gap-6">

        {
          fees.map((fee) => (

            <div
              key={fee.id}
              className="bg-white rounded-2xl shadow-xl p-6"
            >

              <h2 className="text-2xl font-bold mb-2">
  {fee.fee_type}
</h2>

<p className="text-gray-600 mb-4">
  Semester {fee.semester}
</p>
              <h1 className="text-5xl font-bold text-blue-600 mb-4">
                ₹{fee.total_amount}
              </h1>

              <p className="mb-4">

                Status:

                {" "}

                {
                  fee.status === "Paid"

                    ?

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Paid
                    </span>

                    :

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      Pending
                    </span>
                }

              </p>

              {
  fee.status !== "Paid"

  ?

  <button
    onClick={() => payFee(fee)}
    className="bg-green-600 text-white px-5 py-3 rounded-lg"
  >
    Pay Now
  </button>

  :

  <a
    href={`https://campusconnect-fullstack.onrender.com/receipt/${fee.id}`}
    target="_blank"
    rel="noreferrer"
    className="bg-blue-600 text-white px-5 py-3 rounded-lg inline-block"
  >
    📄 Download Receipt
  </a>

}

            </div>

          ))
        }

      </div>

    </div>

  )

}

export default FeePortal