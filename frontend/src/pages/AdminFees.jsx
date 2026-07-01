import { useEffect, useState } from "react"
import axios from "axios"
import Tooltip from "../components/Tooltip"

function AdminFees() {

  const [students, setStudents] = useState([])

  const [studentId, setStudentId] = useState("")
  const [semester, setSemester] = useState("")
  const [feeType, setFeeType] = useState("Semester Fee")
  const [amount, setAmount] = useState("")

  useEffect(() => {

    axios
      .get("https://campusconnect-fullstack.onrender.com/students")
      .then((res) => {

        setStudents(res.data)

        if (res.data.length > 0) {

          setStudentId(res.data[0].id)

        }

      })

  }, [])

  const createFee = async (e) => {

    e.preventDefault()

    try {

      const token =
        localStorage.getItem("token")

      await axios.post(

        "https://campusconnect-fullstack.onrender.com/fees",

        {
  student_id: Number(studentId),

  semester: Number(semester),

  fee_type: feeType,

  total_amount: Number(amount),

  paid_amount: 0,

  pending_amount: Number(amount),

  payment_date: null
},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      )

      alert("Fee Created Successfully")

      setSemester("")
      setAmount("")
      setFeeType("Semester Fee")

    }

   catch (error) {

  console.log(error)

  console.log(error.response)

  console.log(error.response?.data)

  alert(
    JSON.stringify(error.response?.data)
  )

}

  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        💰 Fee Management
      </h1>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 p-6">

        <form
          onSubmit={createFee}
          className="grid gap-4"
        >

          <div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Student
    </label>

    <Tooltip text="Select the student for whom the fee is being created." />

  </div>

  <select
    value={studentId}
    onChange={(e)=>setStudentId(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  >

    {
      students.map(student=>(

        <option
          key={student.id}
          value={student.id}
        >
          {student.name}
        </option>

      ))
    }

  </select>

</div>
<div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Semester
    </label>

    <Tooltip text="Choose the semester for which this fee is applicable." />

  </div>

  <select
    value={semester}
    onChange={(e)=>setSemester(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  >

    <option value="">
      Select Semester
    </option>

    {[1,2,3,4,5,6,7,8].map((sem)=>(

      <option
        key={sem}
        value={sem}
      >
        Semester {sem}
      </option>

    ))}

  </select>

</div>

          <div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Fee Type
    </label>

    <Tooltip text="Select the category of fee to be charged." />

  </div>

  <select
    value={feeType}
    onChange={(e)=>setFeeType(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  >

    <option>
      Semester Fee
    </option>

    <option>
      Exam Fee
    </option>

    <option>
      Hostel Fee
    </option>

    <option>
      Library Fine
    </option>

  </select>

</div>

          <div className="mb-6">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Amount (₹)
    </label>

    <Tooltip text="Enter the fee amount in Indian Rupees." />

  </div>

  <input
    type="number"
    value={amount}
    onChange={(e)=>setAmount(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  />

</div>

          <button
            className="bg-blue-600 text-white p-3 rounded"
          >
            Create Fee
          </button>

        </form>

      </div>

    </div>

  )

}

export default AdminFees