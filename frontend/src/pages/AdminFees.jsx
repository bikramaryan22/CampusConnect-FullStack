import { useEffect, useState } from "react"
import axios from "axios"

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
          amount: Number(amount)
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

      alert("Failed")

    }

  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        💰 Fee Management
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <form
          onSubmit={createFee}
          className="grid gap-4"
        >

          <select
            value={studentId}
            onChange={(e)=>
              setStudentId(e.target.value)
            }
            className="border p-3 rounded"
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

          <select
            value={semester}
            onChange={(e)=>
              setSemester(e.target.value)
            }
            className="border p-3 rounded"
          >

            <option value="">
              Select Semester
            </option>

            {[1,2,3,4,5,6,7,8].map(sem=>(

              <option
                key={sem}
                value={sem}
              >
                Semester {sem}
              </option>

            ))}

          </select>

          <select
            value={feeType}
            onChange={(e)=>
              setFeeType(e.target.value)
            }
            className="border p-3 rounded"
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

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e)=>
              setAmount(e.target.value)
            }
            className="border p-3 rounded"
          />

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