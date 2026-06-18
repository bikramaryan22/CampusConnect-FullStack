import { useEffect, useState } from "react"
import axios from "axios"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend
} from "recharts"

function Dashboard() {

  const [totalStudents, setTotalStudents] = useState(0)
  const [placementDrives, setPlacementDrives] = useState(0)
  const [selectedStudents, setSelectedStudents] = useState(0)
  const [branches, setBranches] = useState({})
  const [averageCgpa, setAverageCgpa] = useState(0)
  const [placementStatus, setPlacementStatus] = useState({})

  useEffect(() => {

    axios
      .get("https://campusconnect-fullstack.onrender.com/dashboard/total-students")
      .then((res) =>
        setTotalStudents(res.data.total_students)
      )

    axios
      .get("https://campusconnect-fullstack.onrender.com/dashboard/placement-drives")
      .then((res) =>
        setPlacementDrives(res.data.placement_drives)
      )

    axios
      .get("https://campusconnect-fullstack.onrender.com/dashboard/selected-students")
      .then((res) =>
        setSelectedStudents(res.data.selected_students)
      )

    axios
      .get("https://campusconnect-fullstack.onrender.com/dashboard/branches")
      .then((res) =>
        setBranches(res.data)
      )
    axios
  .get("https://campusconnect-fullstack.onrender.com/students")
  .then((res) => {

    const students = res.data

    if (students.length > 0) {

      const totalCgpa =
        students.reduce(
          (sum, student) =>
            sum + student.cgpa,
          0
        )

      setAverageCgpa(
        (
          totalCgpa /
          students.length
        ).toFixed(2)
      )

    }

  })
  axios
  .get(
    "https://campusconnect-fullstack.onrender.com/dashboard/placement-status"
  )
  .then((res) => {

    setPlacementStatus(res.data)

  })

  }, [])

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Welcome to CampusConnect
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Total Students
          </h3>

          <h1 className="text-5xl font-bold mt-3">
            {totalStudents}
          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Placement Drives
          </h3>

          <h1 className="text-5xl font-bold mt-3">
            {placementDrives}
          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Selected Students
          </h3>

          <h1 className="text-5xl font-bold mt-3">
            {selectedStudents}
          </h1>

        </div>
        <div className="bg-white rounded-xl shadow p-6">

  <h3 className="text-gray-500">
    Average CGPA
  </h3>

  <h1 className="text-5xl font-bold mt-3">
    {averageCgpa}
  </h1>

</div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold mb-6">
    Branch Analytics
  </h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <BarChart
      data={
        Object.entries(branches).map(
          ([branch, count]) => ({
            branch,
            count
          })
        )
      }
    >

      <XAxis dataKey="branch" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="count"
      />

    </BarChart>

  </ResponsiveContainer>

</div>
<div className="bg-white rounded-xl shadow p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Placement Status Analytics
  </h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <PieChart>

      <Pie
        data={
          Object.entries(
            placementStatus
          ).map(
            ([status, count]) => ({
              status,
              count
            })
          )
        }
        dataKey="count"
        nameKey="status"
        outerRadius={100}
      />

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

    </div>

  )

}

export default Dashboard

