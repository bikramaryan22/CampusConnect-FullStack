import { useEffect, useState } from "react"
import axios from "axios"
import { getUserRole } from "../utils/auth"

function Sports() {
  const role = getUserRole()

  const [records, setRecords] = useState([])

  const [sport, setSport] = useState("")
  const [achievement, setAchievement] = useState("")
  const [year, setYear] = useState("")
  const [students, setStudents] = useState([])
const [selectedStudent, setSelectedStudent] = useState("")

  const [showForm, setShowForm] = useState(false)

  const fetchRecords = (studentId) => {

    axios
      .get(
  `https://campusconnect-fullstack.onrender.com/sports/${studentId}`
)
      .then((res) => {
        setRecords(res.data)
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

    })

  }

}, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    const currentYear = new Date().getFullYear()

    if (year < 2000 || year > currentYear) {

      alert("Enter a valid year")

      return

    }

    try {

      await axios.post(
        "https://campusconnect-fullstack.onrender.com/sports",
        {
          student_id: Number(selectedStudent),
          sport,
          achievement,
          year: Number(year)
        }
      )

      setSport("")
      setAchievement("")
      setYear("")

      setShowForm(false)

      fetchRecords(selectedStudent)

      alert("Sports Record Added")

    } catch (error) {

      console.log(error)

      alert("Failed")

    }

  }

  const deleteRecord = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this sports record?"
    )

    if (!confirmDelete) return

    try {

      await axios.delete(
        `https://campusconnect-fullstack.onrender.com/sports/${id}`
      )

      fetchRecords(selectedStudent)

      alert("Deleted Successfully")

    } catch (error) {

      console.log(error)

      alert("Delete Failed")

    }

  }

  return (

    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

  <h1 className="text-3xl font-bold">
    Sports Achievements
  </h1>

  <p className="text-gray-500">
    Track student sports records
  </p>

</div>

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

      {showForm && (

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 p-6 mb-6">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Sport"
              value={sport}
              onChange={(e) =>
                setSport(e.target.value)
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
              type="text"
              placeholder="Achievement"
              value={achievement}
              onChange={(e) =>
                setAchievement(e.target.value)
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
              placeholder="Year"
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
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

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">

              <th className="p-4 text-left">
                Sport
              </th>

              <th className="p-4 text-left">
                Achievement
              </th>

              <th className="p-4 text-left">
                Year
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

  {records.length === 0 ? (

    <tr>

      <td
        colSpan="4"
        className="text-center p-8 text-gray-500"
      >
        No Sports Records Found
      </td>

    </tr>

  ) : (

    records.map((record) => (

              <tr
                key={record.id}
                className="border-b"
              >

                <td className="p-4">
                  {record.sport}
                </td>

                <td className="p-4">

  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

    {record.achievement}

  </span>

</td>
<td className="p-4">

  <span className="bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 min-h-screen px-3 py-1 rounded-full">

    {record.year}

  </span>

</td>

                <td className="p-4">

  {
    role === "admin" && (

      <button
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
        onClick={() =>
          deleteRecord(record.id)
        }
      >
        Delete
      </button>

    )
  }

</td>

              </tr>

            )))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Sports