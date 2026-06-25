import { useEffect, useState } from "react"
import axios from "axios"

function Profile() {

  const [student, setStudent] = useState(null)

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

    setStudent(res.data)

  })
  .catch((err) => {

    console.log(err)

  })

}, [])

  if (!student) {

    return <h2>Loading...</h2>

  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 p-8">
        <div className="flex justify-center mb-6">

  {
    student.photo

    ?

    <img
      src={`https://campusconnect-fullstack.onrender.com/${student.photo}`}
      alt="Student"
      className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
    />

    :

    <div
      className="w-36 h-36 rounded-full bg-blue-600 text-white flex items-center justify-center text-6xl font-bold"
    >
      {student.name[0]}
    </div>

  }

</div>

        <h2 className="text-2xl font-bold mb-6">
          {student.name}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <strong>Email:</strong>
            {" "}
            {student.email}
          </div>

          <div>
            <strong>Phone:</strong>
            {" "}
            {student.phone}
          </div>

          <div>
            <strong>Branch:</strong>
            {" "}
            {student.branch}
          </div>

          <div>
            <strong>Year:</strong>
            {" "}
            {student.year}
          </div>

          <div>
            <strong>CGPA:</strong>
            {" "}
            {student.cgpa}
          </div>

        </div>

      </div>

    </div>

  )

}

export default Profile