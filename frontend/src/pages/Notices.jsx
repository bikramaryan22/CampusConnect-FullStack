import { useState, useEffect } from "react"
import axios from "axios"
import { getUserRole } from "../utils/auth"

function Notices() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [notices, setNotices] = useState([])
  const role = getUserRole()

  const fetchNotices = () => {

    axios
      .get(
        "https://campusconnect-fullstack.onrender.com/notices"
      )
      .then((res) => {

        setNotices(res.data)

      })
      .catch((err) => {

        console.log(err)

      })

  }

  useEffect(() => {

    fetchNotices()

  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const token =
        localStorage.getItem("token")

      await axios.post(
        "https://campusconnect-fullstack.onrender.com/notices",
        {
          title,
          description
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      setTitle("")
      setDescription("")

      fetchNotices()

      alert("Notice Added")

    } catch (error) {

      console.log(error)

      alert("Failed")

    }

  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        📢 Notice Management
      </h1>

      {
  role === "admin" && (

    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 p-6 mb-8">

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
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

        <textarea
          placeholder="Notice Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Add Notice
        </button>

      </form>

    </div>

  )
}

      <div className="space-y-4">

        {
          notices.map((notice) => (

            <div
              key={notice.id}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 p-5"
            >

              <h3 className="text-xl font-bold">
                {notice.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {notice.description}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  )

}

export default Notices