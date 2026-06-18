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

  const [showForm, setShowForm] = useState(false)

  const fetchRecords = () => {

    axios
      .get("http://127.0.0.1:8000/academics/1")
      .then((res) => {
        setRecords(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const fetchCGPA = () => {

    axios
      .get("http://127.0.0.1:8000/students/1/cgpa")
      .then((res) => {
        setCgpa(res.data.cgpa)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  useEffect(() => {

    fetchRecords()

    fetchCGPA()

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
        "http://127.0.0.1:8000/academics",
        {
          student_id: 1,
          semester: Number(semester),
          gpa: Number(gpa),
          backlogs: Number(backlogs)
        }
      )

      setSemester("")
      setGpa("")
      setBacklogs("")

      setShowForm(false)

      fetchRecords()

      fetchCGPA()

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
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow p-6 mb-6">

        <h3 className="text-blue-100">
          Current CGPA
        </h3>

        <h1 className="text-5xl font-bold mt-2">
          {cgpa}
        </h1>

      </div>

      {showForm && (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <form onSubmit={handleSubmit}>

            <input
              type="number"
              placeholder="Semester"
              value={semester}
              onChange={(e) =>
                setSemester(e.target.value)
              }
              className="border p-3 rounded-lg mr-3"
            />

            <input
              type="number"
              step="0.1"
              placeholder="GPA"
              value={gpa}
              onChange={(e) =>
                setGpa(e.target.value)
              }
              className="border p-3 rounded-lg mr-3"
            />

            <input
              type="number"
              placeholder="Backlogs"
              value={backlogs}
              onChange={(e) =>
                setBacklogs(e.target.value)
              }
              className="border p-3 rounded-lg mr-3"
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

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-800 text-white">

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

