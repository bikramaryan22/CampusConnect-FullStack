import { useEffect, useState } from "react"
import axios from "axios"
import { getUserRole } from "../utils/auth"

function Students() {

  const role = getUserRole()

  const [students, setStudents] = useState([])

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [photo, setPhoto] = useState(null)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [cgpa, setCgpa] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")


  const fetchStudents = () => {

    axios
      .get("https://campusconnect-fullstack.onrender.com/students")
      .then((response) => {
        setStudents(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    )

    if (!confirmDelete) {
      return
    }

    try {
      const token =
  localStorage.getItem("token")

      await axios.delete(
  `https://campusconnect-fullstack.onrender.com/students/${id}`,
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
)

      fetchStudents()

      alert("Student Deleted Successfully")

    } catch (error) {

      console.log(error)

      alert("Delete Failed")

    }

  }
  const editStudent = (student) => {

  setEditingId(student.id)

  setName(student.name)
  setEmail(student.email)
  setPhone(student.phone)
  setBranch(student.branch)
  setYear(student.year.toString())
  setCgpa(student.cgpa.toString())

}

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (![1, 2, 3, 4].includes(Number(year))) {
      alert("Year must be between 1 and 4")
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email address")
      return
    }

    if (cgpa < 0 || cgpa > 10) {
      alert("CGPA must be between 0 and 10")
      return
    }

    try {
      const token =
  localStorage.getItem("token")

  let photoPath = ""

if (photo) {

  const formData =
    new FormData()

  formData.append(
    "file",
    photo
  )

  const upload =
    await axios.post(

      "https://campusconnect-fullstack.onrender.com/upload-photo",

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }

    )

  photoPath =
    upload.data.photo

}
  const studentData = {
  username,
  password,
  name,
  email,
  phone,
  branch,
  year: Number(year),
  cgpa: Number(cgpa),
  photo: photoPath
}

  if (editingId) {

    await axios.put(
  `https://campusconnect-fullstack.onrender.com/students/${editingId}`,
  studentData,
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
)

    alert("Student Updated Successfully")

  } else {

    await axios.post(
  "https://campusconnect-fullstack.onrender.com/students",
  studentData,
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
)

    alert("Student Added Successfully")

  }

  setEditingId(null)

  setUsername("")
setPassword("")
setPhoto(null)

setName("")
setEmail("")
setPhone("")
setBranch("")
setYear("")
setCgpa("")

  setShowForm(false)

  fetchStudents()

} catch (error) {

  console.log("FULL ERROR:", error)

  console.log("RESPONSE:", error.response)

  console.log("DATA:", error.response?.data)

  alert(JSON.stringify(error.response?.data))

}
  }

  return (

    <div>

      <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Students
  </h1>

  {
role === "admin" && (

  <button
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    onClick={() => setShowForm(!showForm)}
  >
    {showForm
      ? "Close Form"
      : "+ Add Student"}
  </button>

)
}
    

</div>

    {showForm && (

<div className="bg-white p-6 rounded-xl shadow mb-6">
      <form onSubmit={handleSubmit}>

  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) =>
      setUsername(e.target.value)
    }
  />

  <br /><br />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />
  <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setPhoto(e.target.files[0])
  }
/>

<br /><br />

  <br /><br />

  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="tel"
          maxLength="10"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {

            const value = e.target.value

            if (/^\d*$/.test(value) && value.length <= 10) {
              setPhone(value)
            }

          }}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />

        <br /><br />

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <br /><br />

        <input
          type="number"
          step="0.1"
          placeholder="CGPA"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
        />

        <br /><br />

        <button type="submit">

  {editingId
    ? "Update Student"
    : "Add Student"}

</button>

      </form>
      </div>

)}

      <hr />
      <div className="mb-4">

  <input
    type="text"
    placeholder="Search Student..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="border p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

  <table className="w-full">

        <thead>

          <tr>
            <th className="bg-slate-800 text-white p-4 text-left">
  Name
</th>
          <th className="bg-slate-800 text-white p-4 text-left">
  Branch
</th>

<th className="bg-slate-800 text-white p-4 text-left">
  Year
</th>

<th className="bg-slate-800 text-white p-4 text-left">
  CGPA
</th>

<th className="bg-slate-800 text-white p-4 text-left">
  Actions
</th>  
          </tr>

        </thead>

        <tbody>

          {students
  .filter((student) =>
    student.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map((student) => (

            <tr key={student.id}>

              <td className="p-4 border-b">
  {student.name}
</td>
              <td className="p-4 border-b">
  {student.branch}
</td>

<td className="p-4 border-b">
  {student.year}
</td>

<td className="p-4 border-b">
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
    {student.cgpa}
  </span>
</td>

              <td>

  {
    role === "admin" && (

      <>

        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded"
          onClick={() => editStudent(student)}
        >
          Edit
        </button>

        {" "}

        <button
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => deleteStudent(student.id)}
        >
          Delete
        </button>

      </>

    )
  }

</td>

            </tr>

          ))}

        </tbody>

      </table>
      </div>

    </div>

  )

}

export default Students

