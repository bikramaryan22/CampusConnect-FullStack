import { useEffect, useState } from "react"
import axios from "axios"

function Profile() {

  const [student, setStudent] = useState(null)

useEffect(() => {

  const token =
    localStorage.getItem("token")

  axios.get(
    "http://127.0.0.1:8000/my-profile",
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

      <div className="bg-white rounded-xl shadow p-8">

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