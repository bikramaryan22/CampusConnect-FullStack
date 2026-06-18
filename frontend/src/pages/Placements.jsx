import { useEffect, useState } from "react"
import axios from "axios"
import { getUserRole } from "../utils/auth"

function Placements() {
  const role = getUserRole()
  const [drives, setDrives] = useState([])
  const [applications, setApplications] = useState([])
  const [studentId, setStudentId] = useState(null)
  const [allApplications, setAllApplications] = useState([])
  const [showForm, setShowForm] = useState(false)

const [companyName, setCompanyName] = useState("")
const [pkg, setPkg] = useState("")
const [location, setLocation] = useState("")
const [deadline, setDeadline] = useState("")
const [minCgpa, setMinCgpa] = useState("")
const [description, setDescription] = useState("")

  const fetchDrives = () => {

    axios
      .get("https://campusconnect-fullstack.onrender.com/placements")
      .then((res) => {
        setDrives(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const fetchApplications = () => {

  if (!studentId) return

  axios
    .get(
      `https://campusconnect-fullstack.onrender.com/applications/${studentId}`
    )
    .then((res) => {

      setApplications(res.data)

    })
    .catch((err) => {

      console.log(err)

    })

}

  const fetchAllApplications = () => {

  axios
    .get(
      "https://campusconnect-fullstack.onrender.com/applications"
    )
    .then((res) => {

      setAllApplications(res.data)

    })
    .catch((err) => {

      console.log(err)

    })

}

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

  setStudentId(res.data.id)

})
.catch((err) => {

  console.log(err)

})

  fetchDrives()

  if (role === "admin") {

  fetchAllApplications()

}

}, [])

useEffect(() => {

  if (studentId) {

    fetchApplications()

  }

}, [studentId])

  const applyDrive = async (driveId) => {

    try {

      await axios.post(
        "https://campusconnect-fullstack.onrender.com/apply",
        {
          student_id: studentId,
          drive_id: driveId
        }
      )

      alert("Applied Successfully")

      fetchApplications()

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.detail ||
        "Application Failed"
      )

    }

  }

  const hasApplied = (driveId) => {

    return applications.some(
      (app) => app.drive_id === driveId
    )

  }
  const getDriveDetails = (driveId) => {

  return drives.find(
    (drive) => drive.id === driveId
  )

}
const addDrive = async (e) => {

  e.preventDefault()

  try {

    const token =
  localStorage.getItem("token")

await axios.post(
  "https://campusconnect-fullstack.onrender.com/placements",
  {
    company_name: companyName,
    package: Number(pkg),
    location,
    deadline,
    min_cgpa: Number(minCgpa),
    description
  },
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
)

    alert("Drive Added Successfully")

    setCompanyName("")
    setPkg("")
    setLocation("")
    setDeadline("")
    setMinCgpa("")
    setDescription("")

    setShowForm(false)

    fetchDrives()

  } catch (error) {

    console.log(error)

    alert("Failed To Add Drive")

  }

}

const updateStatus = async (
  applicationId,
  status
) => {

  try {

    await axios.put(
      `https://campusconnect-fullstack.onrender.com/applications/${applicationId}`,
      {
        status
      }
    )

    alert("Status Updated")

    fetchAllApplications()

  } catch (error) {

    console.log(error)

    alert("Update Failed")

  }

}
  return (

    <div>

      <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Placement Drives
  </h1>

  {
    role === "admin" && (

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() =>
          setShowForm(!showForm)
        }
      >
        {showForm
          ? "Close Form"
          : "+ Add Drive"}
      </button>

    )
  }

</div>
    {
  showForm && (

    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <form
        onSubmit={addDrive}
        className="grid gap-3"
      >

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) =>
            setCompanyName(e.target.value)
          }
          className="border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Package"
          value={pkg}
          onChange={(e) =>
            setPkg(e.target.value)
          }
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="border p-3 rounded"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
          className="border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Minimum CGPA"
          value={minCgpa}
          onChange={(e) =>
            setMinCgpa(e.target.value)
          }
          className="border p-3 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded"
        >
          Create Drive
        </button>

      </form>

    </div>

  )
}

      <div className="grid md:grid-cols-2 gap-6">

        {drives.map((drive) => (

          <div
            key={drive.id}
            className="bg-white rounded-xl shadow p-6"
          >

            <div className="flex justify-between items-center mb-3">

  <h2 className="text-2xl font-bold">
    {drive.company_name}
  </h2>

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

    {drive.package} LPA

  </span>

</div>

            <p className="text-gray-600 mb-4">
  {drive.description}
</p>

            <div className="space-y-2">

  <p>
    📍 {drive.location}
  </p>

  <p>
    🎓 Minimum CGPA:
    {" "}
    {drive.min_cgpa}
  </p>

  <p>
    📅 Deadline:
    {" "}
    {drive.deadline}
  </p>

</div>

            {
  role === "student" && (

    hasApplied(drive.id)

      ?

      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
        disabled
      >
        Applied ✓
      </button>

      :

      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
        onClick={() =>
          applyDrive(drive.id)
        }
      >
        Apply
      </button>

  )
}

          </div>

        ))}

      </div>

      {
  role === "student" && (

    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        My Applications
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {applications.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-4">
            No Applications Yet
          </div>

        ) : (

          applications.map((app) => {

            const drive =
              getDriveDetails(
                app.drive_id
              )

            return (

              <div
                key={app.id}
                className="bg-white rounded-xl shadow p-4"
              >

                <h3 className="font-bold text-lg">
                  {drive?.company_name}
                </h3>

                <p className="text-gray-600">
                  {drive?.description}
                </p>

                <p className="mt-2">
                  Status:{" "}
                  <span
  className={
    app.status === "Selected"
      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
      : app.status === "Rejected"
      ? "bg-red-100 text-red-700 px-3 py-1 rounded-full"
      : app.status === "Shortlisted"
      ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
      : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
  }
>
  {app.status}
</span>
                </p>

              </div>

            )

          })

        )}

      </div>

    </div>

  )
}
{
  role === "admin" && (

    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Placement Applications
      </h2>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition">

        {allApplications.map((app) => (

          <div
            key={app.id}
            className="border-b py-4 flex justify-between items-center"
          >

            <div>

              <p>
                Student ID:
                {" "}
                {app.student_id}
              </p>

              <p>
                Drive ID:
                {" "}
                {app.drive_id}
              </p>

            </div>

            <select
              value={app.status}
              onChange={(e) =>
                updateStatus(
                  app.id,
                  e.target.value
                )
              }
              className="border p-2 rounded"
            >

              <option>
                Applied
              </option>

              <option>
                Shortlisted
              </option>

              <option>
                Selected
              </option>

              <option>
                Rejected
              </option>

            </select>

          </div>

        ))}

      </div>

    </div>

  )
}

    </div>

  )

}

export default Placements

