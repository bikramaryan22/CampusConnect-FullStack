import { useEffect, useState } from "react"
import axios from "axios"
import { getUserRole } from "../utils/auth"
import Tooltip from "../components/Tooltip"

function Students() {

  const role = getUserRole()

  const [students, setStudents] = useState([])

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [photo, setPhoto] = useState(null)
const [preview, setPreview] = useState("")
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
  setShowForm(true)
  

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
  if (editingId) {

  const updateData = {
    name,
    email,
    phone,
    branch,
    year: Number(year),
    cgpa: Number(cgpa),
    photo: photoPath
  }

  await axios.put(
    `https://campusconnect-fullstack.onrender.com/students/${editingId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  alert("Student Updated Successfully")

} else {

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

  await axios.post(
    "https://campusconnect-fullstack.onrender.com/students",
    studentData,
    {
      headers: {
        Authorization: `Bearer ${token}`
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
    className="
bg-gradient-to-r
from-blue-600
to-indigo-700
text-white
font-semibold
px-5
py-3
rounded-xl
shadow-lg
hover:scale-105
hover:shadow-xl
active:scale-95
transition-all
duration-300
"
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

<div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-6">
      <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-5"
>

  <div className="mb-4">

<div className="flex items-center gap-2 mb-2">

<label>

Username

</label>

<Tooltip text="Username must be unique." />

</div>

<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="border border-gray-300 rounded-xl p-3 w-full"
/>

</div>

  <div className="mb-4">

<div className="flex items-center gap-2 mb-2">

<label>

Password

</label>

<Tooltip text="Default password for first login." />

</div>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border border-gray-300 rounded-xl p-3 w-full"
/>

</div>

  <div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Student Name
    </label>

    <Tooltip text="Enter the student's full name." />

  </div>

  <input
    type="text"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  />

</div>

  <div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Email
    </label>

    <Tooltip text="Enter a valid email address." />

  </div>

  <input
    type="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  />

</div>

  <div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Phone Number
    </label>

    <Tooltip text="Phone number must contain exactly 10 digits." />

  </div>

  <input
    type="tel"
    maxLength="10"
    value={phone}
    onChange={(e)=>{

      const value=e.target.value

      if(/^\d*$/.test(value) && value.length<=10){

        setPhone(value)

      }

    }}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  />

</div>

  <div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Branch
    </label>

    <Tooltip text="Select the student's department." />

  </div>

  <input
    type="text"
    value={branch}
    onChange={(e)=>setBranch(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  />

</div>

  <div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      Academic Year
    </label>

    <Tooltip text="Choose the student's current academic year." />

  </div>

  <select
    value={year}
    onChange={(e)=>setYear(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full"
  >

    <option value="">Select Year</option>
    <option value="1">1st Year</option>
    <option value="2">2nd Year</option>
    <option value="3">3rd Year</option>
    <option value="4">4th Year</option>

  </select>

</div>

  <div className="mb-4">

  <div className="flex items-center gap-2 mb-2">

    <label className="font-medium">
      CGPA
    </label>

    <Tooltip text="Enter CGPA between 0 and 10." />

  </div>

  <input
    type="number"
    step="0.1"
    value={cgpa}
    onChange={(e)=>setCgpa(e.target.value)}
    className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
  />

</div>

  <div className="md:col-span-2">

    <label className="block mb-2 font-semibold">
      Student Photo
    </label>

    <div className="flex flex-col items-center">

  {

    preview

    ?

    <img
      src={preview}
      alt="Preview"
      className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-4"
    />

    :

    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-6xl mb-4">

      👤

    </div>

  }

  <label
    className="
    cursor-pointer
    bg-blue-600
    text-white
    px-6
    py-3
    rounded-xl
    hover:bg-blue-700
    transition
    "
  >

    Choose Photo

    <input
      hidden
      type="file"
      accept="image/*"
      onChange={(e)=>{

        const file =
          e.target.files[0]

        setPhoto(file)

        if(file){

          setPreview(
            URL.createObjectURL(file)
          )

        }

      }}
    />

  </label>

</div>

  </div>

  <div className="md:col-span-2">

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
    >
      {editingId
        ? "Update Student"
        : "Add Student"}
    </button>

  </div>

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
    className="
border
border-gray-300
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none
transition-all
duration-200
"
  />

</div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">

  <table className="w-full">

        <thead>

          <tr>
            <th className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 text-left">
  Name
</th>
          <th className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 text-left">
  Branch
</th>

<th className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 text-left">
  Year
</th>

<th className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 text-left">
  CGPA
</th>

<th className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 text-left">
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

            <tr
  key={student.id}
  className="
  hover:bg-blue-50
  transition-all
  duration-300
  "
>

<td className="p-4 border-b">

  <div className="flex items-center gap-4">

    {
      student.photo

      ?

      <img
        src={`https://campusconnect-fullstack.onrender.com/${student.photo}`}
        alt={student.name}
        className="w-12 h-12 rounded-full object-cover border"
      />

      :

      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

        {student.name[0]}

      </div>

    }

    <div>

      <h3 className="font-semibold">
        {student.name}
      </h3>

      <p className="text-sm text-gray-500">
        {student.email}
      </p>

    </div>

  </div>

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

