import { useEffect, useState } from "react"
import axios from "axios"
import { getUserRole } from "../utils/auth"

function Attendance() {

  const role = getUserRole()

  const [records, setRecords] = useState([])
  const [students, setStudents] = useState([])

  const [selectedStudent, setSelectedStudent] = useState("")
  const [subject, setSubject] = useState("")
  const [attended, setAttended] = useState("")
  const [total, setTotal] = useState("")
  const [faculty, setFaculty] = useState("")

  const fetchAttendance = (studentId) => {

    axios
      .get(
        `https://campusconnect-fullstack.onrender.com/attendance/${studentId}`
      )
      .then((res) => {

        setRecords(res.data)

      })

  }

  useEffect(() => {

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

            fetchAttendance(
              res.data[0].id
            )

          }

        })

    }

  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const token =
        localStorage.getItem("token")

      await axios.post(
        "https://campusconnect-fullstack.onrender.com/attendance",
        {
  student_id: Number(
    selectedStudent
  ),

  subject,

  attended: Number(attended),

  total: Number(total),

  faculty
},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      setSubject("")
      setAttended("")
      setTotal("")
      setFaculty("")

      fetchAttendance(
        selectedStudent
      )

      alert(
        "Attendance Added"
      )

    } catch (error) {

      console.log(error)

      alert(
        "Failed"
      )

    }

  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        📅 Attendance
      </h1>

      {
        role === "admin" && (

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 p-6 mb-6">

            <form
              onSubmit={handleSubmit}
            >

              <select
                value={
                  selectedStudent
                }
                onChange={(e) => {

                  setSelectedStudent(
                    e.target.value
                  )

                  fetchAttendance(
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

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) =>
                  setSubject(
                    e.target.value
                  )
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
                placeholder="Attended"
                value={attended}
                onChange={(e) =>
                  setAttended(
                    e.target.value
                  )
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
                placeholder="Total"
                value={total}
                onChange={(e) =>
                  setTotal(
                    e.target.value
                  )
                }
                
              />
              <input
  type="text"
  placeholder="Faculty Name"
  value={faculty}
  onChange={(e) =>
    setFaculty(e.target.value)
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
                className="bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Add
              </button>

            </form>

          </div>

        )
      }

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">

              <th className="p-4 text-left">
                Subject
              </th>

             <th className="p-4 text-left">
  Faculty
</th>

<th className="p-4 text-left">
  Attended
</th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                %
              </th>

            </tr>

          </thead>

          <tbody>

            {
              records.map(
                (record) => (

                  <tr
                    key={record.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {record.subject}
                    </td>

                    <td className="p-4">
  {record.faculty}
</td>

<td className="p-4">
  {record.attended}
</td>

                    <td className="p-4">
                      {record.total}
                    </td>

                    <td className="p-4">

                      {
                        (
                          (record.attended /
                            record.total) *
                          100
                        ).toFixed(0)
                      }%

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Attendance