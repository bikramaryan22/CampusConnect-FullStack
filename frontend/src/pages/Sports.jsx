import { useEffect, useState } from "react"
import axios from "axios"
import { getUserRole } from "../utils/auth"

function Sports() {
  const role = getUserRole()

  const [records, setRecords] = useState([])

  const [sport, setSport] = useState("")
  const [achievement, setAchievement] = useState("")
  const [year, setYear] = useState("")

  const [showForm, setShowForm] = useState(false)

  const fetchRecords = () => {

    axios
      .get("https://campusconnect-fullstack.onrender.com/sports/1")
      .then((res) => {
        setRecords(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  useEffect(() => {

    fetchRecords()

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
          student_id: 1,
          sport,
          achievement,
          year: Number(year)
        }
      )

      setSport("")
      setAchievement("")
      setYear("")

      setShowForm(false)

      fetchRecords()

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

      fetchRecords()

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

      {showForm && (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Sport"
              value={sport}
              onChange={(e) =>
                setSport(e.target.value)
              }
              className="border p-3 rounded-lg mr-3"
            />

            <input
              type="text"
              placeholder="Achievement"
              value={achievement}
              onChange={(e) =>
                setAchievement(e.target.value)
              }
              className="border p-3 rounded-lg mr-3"
            />

            <input
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
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

  <span className="bg-gray-100 px-3 py-1 rounded-full">

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