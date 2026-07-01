import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function StudentDetails() {

  const { id } = useParams()

  const [student, setStudent] = useState(null)
  const [academics, setAcademics] = useState([])
  const [fees, setFees] = useState([])
  const [attendance, setAttendance] = useState([])

  useEffect(() => {

    axios
  .get(
    `https://campusconnect-fullstack.onrender.com/students/${id}`
  )
  .then((res) => {

    setStudent(res.data)
    axios
  .get(
    `https://campusconnect-fullstack.onrender.com/academics/${id}`
  )
  .then((academicRes) => {

    setAcademics(academicRes.data)

  })
  axios
  .get(
    `https://campusconnect-fullstack.onrender.com/fees/${id}`
  )
  .then((feeRes) => {

    setFees(feeRes.data)

  })
  axios
  .get(
    `https://campusconnect-fullstack.onrender.com/attendance/${id}`
  )
  .then((attendanceRes) => {

    setAttendance(attendanceRes.data)

  })

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

    <p><strong>Gender:</strong> {student.gender || "-"}</p>

    <p><strong>Date of Birth:</strong> {student.dob || "-"}</p>

    <p><strong>Blood Group:</strong> {student.blood_group || "-"}</p>

    <p><strong>Father Name:</strong> {student.father_name || "-"}</p>

    <p><strong>Mother Name:</strong> {student.mother_name || "-"}</p>

    <p>
  <strong>Address:</strong>{" "}
  {student.address || "-"},
  {" "}
  {student.city || "-"},
  {" "}
  {student.state || "-"} -
  {" "}
  {student.pincode || "-"}
</p>


  </div>

</div>

<div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

  <h2 className="text-2xl font-bold mb-6">

    🎓 College Details

  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <p>
  <strong>Roll Number:</strong> {student.roll_number || "-"}
</p>

    <p><strong>Registration No: {student.registration_number || "-"}</strong> -</p>

    <p><strong>Admission No: {student.admission_number || "-"}</strong> -</p>

    <p><strong>Branch:</strong> {student.branch}</p>

    <p><strong>Year:</strong> {student.year}</p>

    <p><strong>Section: {student.section || "-"}</strong> -</p>

    <p><strong>Batch: {student.batch || "-"}</strong> -</p>

    <p><strong>Admission Date: {student.admission_date || "-"}</strong> -</p>

  </div>

</div>
<div className="grid md:grid-cols-3 gap-4 mb-6">

<div className="bg-blue-50 rounded-xl p-4">

<h3>Total Fee</h3>

<h1 className="text-3xl font-bold">

₹{

fees.reduce(

(sum,f)=>sum+f.total_amount,

0

)

}

</h1>

</div>

<div className="bg-green-50 rounded-xl p-4">

<h3>Total Paid</h3>

<h1 className="text-3xl font-bold">

₹{

fees.reduce(

(sum,f)=>sum+f.paid_amount,

0

)

}

</h1>

</div>

<div className="bg-red-50 rounded-xl p-4">

<h3>Pending</h3>

<h1 className="text-3xl font-bold">

₹{

fees.reduce(

(sum,f)=>sum+f.pending_amount,

0

)

}

</h1>

</div>

</div>

<table className="w-full">

<thead>

<tr className="border-b">

<th className="p-3 text-left">

Semester

</th>

<th className="p-3 text-left">

Fee Type

</th>
<th className="p-3 text-left">
Total
</th>
<th className="p-3 text-left">

Paid

</th>

<th className="p-3 text-left">

Pending

</th>

<th className="p-3 text-left">

Status

</th>

</tr>

</thead>

<tbody>

{

fees.map((fee)=>(

<tr key={fee.id}>

<td className="p-3">

{fee.semester}

</td>

<td className="p-3">

{fee.fee_type}

</td>
<td className="p-3">
₹{fee.total_amount}
</td>

<td className="p-3 text-green-600">

₹{fee.paid_amount}

</td>

<td className="p-3 text-red-600">

₹{fee.pending_amount}

</td>

<td className="p-3">

<span
className={
fee.status==="Paid"
? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
: "bg-red-100 text-red-700 px-3 py-1 rounded-full"
}
>

{fee.status}

</span>

</td>

</tr>

))

}

</tbody>

</table>
<table className="w-full">

  <thead>

<tr className="border-b">

<th className="p-3 text-left">
Semester
</th>

<th className="p-3 text-left">
GPA
</th>

<th className="p-3 text-left">
Credits
</th>

<th className="p-3 text-left">
Attendance
</th>

<th className="p-3 text-left">
Backlogs
</th>

<th className="p-3 text-left">
Remarks
</th>

</tr>

</thead>

  <tbody>

    {

      academics.map((record)=>(

        <tr key={record.id}>

          <td className="p-3">{record.semester}</td>

<td className="p-3">{record.gpa}</td>

<td className="p-3">{record.credits}</td>

<td className="p-3">{record.attendance_percentage}%</td>

<td className="p-3">{record.backlogs}</td>

<td className="p-3">{record.remarks}</td>

        </tr>

      ))

    }

  </tbody>

</table>

<table className="w-full">

  <thead>

    <tr className="border-b">

      <th className="p-3 text-left">

        Subject

      </th>

      <th className="p-3 text-left">

        Faculty

      </th>

      <th className="p-3 text-left">

        Attended

      </th>

      <th className="p-3 text-left">

        Total

      </th>

      <th className="p-3 text-left">

        %

      </th>

    </tr>

  </thead>

  <tbody>

    {

      attendance.map((record)=>(

        <tr key={record.id}>

          <td className="p-3">

            {record.subject}

          </td>

          <td className="p-3">

            {record.faculty}

          </td>

          <td className="p-3">

            {record.attended}

          </td>

          <td className="p-3">

            {record.total}

          </td>

          <td className="p-3">

            <span
              className={
                record.attended / record.total >= 0.75
                  ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                  : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
              }
            >

              {
record.total > 0
? (
(record.attended / record.total) * 100
).toFixed(1)
: 0
}%

            </span>

          </td>

        </tr>

      ))

    }

  </tbody>

</table>
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