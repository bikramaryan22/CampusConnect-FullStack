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
    <strong>Email:</strong> {student.email}
  </div>

  <div>
    <strong>Phone:</strong> {student.phone}
  </div>

  <div>
    <strong>Gender:</strong> {student.gender || "-"}
  </div>

  <div>
    <strong>Date of Birth:</strong> {student.dob || "-"}
  </div>

  <div>
    <strong>Blood Group:</strong> {student.blood_group || "-"}
  </div>

  <div>
    <strong>Branch:</strong> {student.branch}
  </div>

  <div>
    <strong>Year:</strong> {student.year}
  </div>

  <div>
    <strong>CGPA:</strong> {student.cgpa}
  </div>

  <div>
    <strong>Roll Number:</strong> {student.roll_number || "-"}
  </div>

  <div>
    <strong>Registration Number:</strong> {student.registration_number || "-"}
  </div>

  <div>
    <strong>Admission Number:</strong> {student.admission_number || "-"}
  </div>

  <div>
    <strong>Section:</strong> {student.section || "-"}
  </div>

  <div>
    <strong>Batch:</strong> {student.batch || "-"}
  </div>

  <div>
    <strong>Admission Date:</strong> {student.admission_date || "-"}
  </div>

  <div>
    <strong>Father Name:</strong> {student.father_name || "-"}
  </div>

  <div>
    <strong>Mother Name:</strong> {student.mother_name || "-"}
  </div>

  <div>
    <strong>Parent Phone:</strong> {student.parent_phone || "-"}
  </div>

  <div className="md:col-span-2">
    <strong>Address:</strong>{" "}
    {student.address || "-"},
    {" "}
    {student.city || "-"},
    {" "}
    {student.state || "-"} -
    {" "}
    {student.pincode || "-"}
  </div>

</div>
      </div>

    </div>

  )

}

export default Profile