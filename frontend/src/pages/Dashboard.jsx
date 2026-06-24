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

```
<div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white rounded-2xl shadow-xl p-8 mb-8">

  <h1 className="text-4xl font-bold">
    Welcome Back 👋
  </h1>

  <p className="mt-3 text-slate-300">
    Manage students, placements, academics and achievements from one dashboard.
  </p>

</div>
<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">
    🎓 Academic Progress
  </h2>

  <div className="flex flex-wrap gap-3">

    <div className="bg-green-500 text-white px-5 py-3 rounded-full">
      SEM I ✓
    </div>

    <div className="bg-green-500 text-white px-5 py-3 rounded-full">
      SEM II ✓
    </div>

    <div className="bg-green-500 text-white px-5 py-3 rounded-full">
      SEM III ✓
    </div>

    <div className="bg-blue-600 text-white px-5 py-3 rounded-full">
      SEM IV
    </div>

    <div className="bg-slate-200 px-5 py-3 rounded-full">
      SEM V
    </div>

    <div className="bg-slate-200 px-5 py-3 rounded-full">
      SEM VI
    </div>

    <div className="bg-slate-200 px-5 py-3 rounded-full">
      SEM VII
    </div>

    <div className="bg-slate-200 px-5 py-3 rounded-full">
      SEM VIII
    </div>

  </div>

</div>

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-blue-600">

  <h2 className="text-2xl font-bold mb-4">
    📢 Notice Board
  </h2>

  <div className="space-y-3">

    <div className="bg-slate-50 p-3 rounded-lg">
      Placement Drive Registration Open
    </div>

    <div className="bg-slate-50 p-3 rounded-lg">
      Semester Results Published
    </div>

    <div className="bg-slate-50 p-3 rounded-lg">
      Sports Event Registration Open
    </div>

  </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl p-6">

    <div className="flex justify-between items-center">

      <div>

        <h3 className="text-blue-100">
          Total Students
        </h3>

        <h1 className="text-5xl font-bold mt-3">
          {totalStudents}
        </h1>

      </div>

      <div className="text-5xl">
        🎓
      </div>

    </div>

  </div>

  <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white rounded-2xl shadow-xl p-6">

    <div className="flex justify-between items-center">

      <div>

        <h3 className="text-green-100">
          Placement Drives
        </h3>

        <h1 className="text-5xl font-bold mt-3">
          {placementDrives}
        </h1>

      </div>

      <div className="text-5xl">
        💼
      </div>

    </div>

  </div>

  <div className="bg-gradient-to-r from-purple-500 to-violet-700 text-white rounded-2xl shadow-xl p-6">

    <div className="flex justify-between items-center">

      <div>

        <h3 className="text-purple-100">
          Selected Students
        </h3>

        <h1 className="text-5xl font-bold mt-3">
          {selectedStudents}
        </h1>

      </div>

      <div className="text-5xl">
        🎉
      </div>

    </div>

  </div>

  <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl shadow-xl p-6">

    <div className="flex justify-between items-center">

      <div>

        <h3 className="text-orange-100">
          Average CGPA
        </h3>

        <h1 className="text-5xl font-bold mt-3">
          {averageCgpa}
        </h1>

      </div>

      <div className="text-5xl">
        📈
      </div>

    </div>

  </div>

</div>

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">
    📊 Branch Analytics
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

<div className="bg-white rounded-2xl shadow-lg p-6">

  <h2 className="text-2xl font-bold mb-6">
    💼 Placement Status Analytics
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
```

  </div>

)


}

export default Dashboard

