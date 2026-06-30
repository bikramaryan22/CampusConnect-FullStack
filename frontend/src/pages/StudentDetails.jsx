import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function StudentDetails() {

  const { id } = useParams()

  const [student, setStudent] = useState(null)

  useEffect(() => {

    axios
      .get("https://campusconnect-fullstack.onrender.com/students")
      .then((res) => {

        const found = res.data.find(
          (s) => s.id === Number(id)
        )

        setStudent(found)

      })

  }, [id])

  if (!student) {

    return (

      <h1 className="text-2xl">

        Loading...

      </h1>

    )

  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">

        👤 Student Profile

      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center gap-8">

          {

            student.photo

            ?

            <img
              src={`https://campusconnect-fullstack.onrender.com/${student.photo}`}
              alt={student.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />

            :

            <div className="w-40 h-40 rounded-full bg-blue-600 text-white flex items-center justify-center text-6xl">

              {student.name[0]}

            </div>

          }

          <div>

            <h2 className="text-4xl font-bold">

              {student.name}

            </h2>

            <p className="text-gray-500 mt-2">

              {student.email}

            </p>

            <p className="mt-2">

              📱 {student.phone}

            </p>

            <p>

              🎓 {student.branch}

            </p>

            <p>

              📅 Year {student.year}

            </p>

            <p>

              ⭐ CGPA {student.cgpa}

            </p>

          </div>

        </div>

      </div>

    </div>

  )

}

export default StudentDetails