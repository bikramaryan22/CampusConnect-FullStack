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
        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">

    👤 Personal Details

  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <p><strong>Name:</strong> {student.name}</p>

    <p><strong>Email:</strong> {student.email}</p>

    <p><strong>Phone:</strong> {student.phone}</p>

    <p><strong>Gender:</strong> -</p>

    <p><strong>Date of Birth:</strong> -</p>

    <p><strong>Blood Group:</strong> -</p>

    <p><strong>Father Name:</strong> -</p>

    <p><strong>Mother Name:</strong> -</p>

    <p><strong>Address:</strong> -</p>

  </div>

</div>

<div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">

    🎓 College Details

  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <p><strong>Roll Number:</strong> -</p>

    <p><strong>Registration No:</strong> -</p>

    <p><strong>Admission No:</strong> -</p>

    <p><strong>Branch:</strong> {student.branch}</p>

    <p><strong>Year:</strong> {student.year}</p>

    <p><strong>Section:</strong> -</p>

    <p><strong>Batch:</strong> -</p>

    <p><strong>Admission Date:</strong> -</p>

  </div>

</div>

<div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">

    💰 Fee Details

  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <p><strong>Total Fee:</strong> ₹0</p>

    <p><strong>Paid:</strong> ₹0</p>

    <p><strong>Pending:</strong> ₹0</p>

    <p><strong>Status:</strong> Pending</p>

  </div>

</div>
<div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">

    📚 Academic Details

  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <p><strong>CGPA:</strong> {student.cgpa}</p>

    <p><strong>Current Semester:</strong> -</p>

    <p><strong>Backlogs:</strong> -</p>

    <p><strong>Credits:</strong> -</p>

  </div>

</div>

<div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">

    📅 Attendance

  </h2>

  <p>

    Attendance information will appear here.

  </p>

</div>

<div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">

    💼 Placement

  </h2>

  <p>

    Placement information will appear here.

  </p>

</div>
<div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">

    🏆 Sports

  </h2>

  <p>

    Sports achievements will appear here.

  </p>

</div>

<div className="bg-white rounded-3xl shadow-xl p-6 mt-6 mb-10">

  <h2 className="text-2xl font-bold mb-6">

    📄 Documents

  </h2>

  <p>

    Uploaded documents will appear here.

  </p>

</div>


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