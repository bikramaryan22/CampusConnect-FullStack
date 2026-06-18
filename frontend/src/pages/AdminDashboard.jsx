import { useEffect, useState } from "react"
import axios from "axios"

function AdminDashboard() {

  const [totalStudents, setTotalStudents] = useState(0)
  const [placementDrives, setPlacementDrives] = useState(0)
  const [selectedStudents, setSelectedStudents] = useState(0)
  const [applications, setApplications] = useState(0)
  const [averageCgpa, setAverageCgpa] = useState(0)

  useEffect(() => {

    axios
      .get("https://campusconnect-backend-qskx.onrender.com/dashboard/total-students")
      .then((res) =>
        setTotalStudents(
          res.data.total_students
        )
      )

    axios
      .get("https://campusconnect-backend-qskx.onrender.com/dashboard/placement-drives")
      .then((res) =>
        setPlacementDrives(
          res.data.placement_drives
        )
      )

    axios
      .get("https://campusconnect-backend-qskx.onrender.com/dashboard/selected-students")
      .then((res) =>
        setSelectedStudents(
          res.data.selected_students
        )
      )

    axios
      .get("https://campusconnect-backend-qskx.onrender.com/applications")
      .then((res) =>
        setApplications(
          res.data.length
        )
      )

    axios
      .get("https://campusconnect-backend-qskx.onrender.com/students")
      .then((res) => {

        const students = res.data

        if (students.length > 0) {

          const total =
            students.reduce(
              (sum, student) =>
                sum + student.cgpa,
              0
            )

          setAverageCgpa(
            (
              total /
              students.length
            ).toFixed(2)
          )

        }

      })

  }, [])

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        CampusConnect Administration
      </p>

      <div className="grid md:grid-cols-5 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h3>Total Students</h3>
          <h1 className="text-4xl font-bold mt-2">
            {totalStudents}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3>Placement Drives</h3>
          <h1 className="text-4xl font-bold mt-2">
            {placementDrives}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3>Applications</h3>
          <h1 className="text-4xl font-bold mt-2">
            {applications}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3>Selected</h3>
          <h1 className="text-4xl font-bold mt-2">
            {selectedStudents}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3>Average CGPA</h3>
          <h1 className="text-4xl font-bold mt-2">
            {averageCgpa}
          </h1>
        </div>

      </div>

    </div>

  )

}

export default AdminDashboard