import { useEffect, useState } from "react"
import axios from "axios"
import { getUserRole } from "../utils/auth"

function Academics() {

  const role = getUserRole()

  const [records, setRecords] = useState([])
  const [cgpa, setCgpa] = useState(0)

  const [semester, setSemester] = useState("")
  const [gpa, setGpa] = useState("")
  const [backlogs, setBacklogs] = useState("")
  const [students, setStudents] = useState([])
const [selectedStudent, setSelectedStudent] = useState("")

  const [showForm, setShowForm] = useState(false)

  const fetchRecords = (studentId) => {

    axios
      .get(`https://campusconnect-fullstack.onrender.com/academics/${studentId}`)
      .then((res) => {
        setRecords(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const fetchCGPA = (studentId) => {

  axios
    .get(
      `https://campusconnect-fullstack.onrender.com/students/${studentId}/cgpa`
    )
      .then((res) => {
        setCgpa(res.data.cgpa)
      })
      .catch((err) => {
        console.log(err)
      })

  }

useEffect(() => {

  const token =
    localStorage.getItem("token")

  if (role === "admin") {

    axios
      .get(
        "https://campusconnect-fullstack.onrender.com/students"
      )
      .then((res) => {

        setStudents(res.data)

        if (res.data.length > 0) {

          setSelectedStudent(
            res.data[0].id
          )

          fetchRecords(
            res.data[0].id
          )

          fetchCGPA(
            res.data[0].id
          )

        }

      })

  }

  else {

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

      fetchRecords(
        res.data.id
      )

      fetchCGPA(
        res.data.id
      )

    })

  }

}, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (semester < 1 || semester > 8) {
      alert("Semester must be between 1 and 8")
      return
    }

    if (gpa < 0 || gpa > 10) {
      alert("GPA must be between 0 and 10")
      return
    }

    try {

      await axios.post(
        "https://campusconnect-fullstack.onrender.com/academics",
        {
          student_id: Number(selectedStudent),
          semester: Number(semester),
          gpa: Number(gpa),
          backlogs: Number(backlogs)
        }
      )

      setSemester("")
      setGpa("")
      setBacklogs("")

      setShowForm(false)

      fetchRecords(selectedStudent)

      fetchCGPA(selectedStudent)

      alert("Academic Record Added")

    } catch (error) {

      console.log(error)

      alert(
  error.response?.data?.detail ||
  "Failed"
)

    }

  }

  return (

    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Academics
        </h1>

        {
  role === "admin" && (

    <button
      className="
bg-gradient-to-r
from-blue-600
to-indigo-700
text-white
font-semibold
px-5
py-3
rounded-xl
shadow-lg
hover:scale-105
hover:shadow-xl
active:scale-95
transition-all
duration-300
"
      onClick={() =>
        setShowForm(!showForm)
      }
    >
      {showForm
        ? "Close Form"
        : "+ Add Record"}
    </button>

  )
}

      </div>
      {
  role === "admin" && (

    <select
      value={selectedStudent}
      onChange={(e) => {

        setSelectedStudent(
          e.target.value
        )

        fetchRecords(
          e.target.value
        )

        fetchCGPA(
          e.target.value
        )

      }}
      className="
border
border-gray-300
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none
transition-all
duration-200
"
    >

      {
        students.map(
          (student) => (

            <option
              key={student.id}
              value={student.id}
            >
              {student.name}
            </option>

          )
        )
      }

    </select>

  )
}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow p-6 mb-6">

        <h3 className="text-blue-100">
          Current CGPA
        </h3>

        <h1 className="text-5xl font-bold mt-2">
          {cgpa}
        </h1>

      </div>

      {showForm && (

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 p-6 mb-6">

          <form onSubmit={handleSubmit}>

            <input
              type="number"
              placeholder="Semester"
              value={semester}
              onChange={(e) =>
                setSemester(e.target.value)
              }
              className="
border
border-gray-300
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none
transition-all
duration-200
"
            />

            <input
              type="number"
              step="0.1"
              placeholder="GPA"
              value={gpa}
              onChange={(e) =>
                setGpa(e.target.value)
              }
              className="
border
border-gray-300
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none
transition-all
duration-200
"
            />

            <input
              type="number"
              placeholder="Backlogs"
              value={backlogs}
              onChange={(e) =>
                setBacklogs(e.target.value)
              }
              className="
border
border-gray-300
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none
transition-all
duration-200
"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-3 rounded-lg"
            >
              Save
            </button>

          </form>

        </div>

      )}

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">

              <th className="p-4 text-left">
                Semester
              </th>

              <th className="p-4 text-left">
                GPA
              </th>

              <th className="p-4 text-left">
                Backlogs
              </th>

            </tr>

          </thead>

          <tbody>

            {records
  .sort(
    (a, b) =>
      a.semester - b.semester
  )
  .map((record) => (

              <tr
                key={record.id}
                className="border-b"
              >

                <td className="p-4">
                  {record.semester}
                </td>

                <td className="p-4">

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

    {record.gpa}

  </span>

</td>

                <td className="p-4">

  <span
    className={
      record.backlogs === 0
        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
        : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
    }
  >
    {record.backlogs}
  </span>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Academics

