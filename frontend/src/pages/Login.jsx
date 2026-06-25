import { useState } from "react"
import axios from "axios"
import logo from "../assets/logo.png"

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "https://campusconnect-fullstack.onrender.com/login",
        {
          username,
          password
        }
      )

      localStorage.setItem(
  "token",
  response.data.access_token
)

localStorage.setItem(
  "username",
  username
)

if (
  response.data
    .must_change_password
) {

  window.location.href =
    "/change-password"

  return

}

window.location.href = "/"

    } catch (error) {

      console.log(error)

      alert(
  error.response?.data?.detail ||
  "Invalid Credentials"
)

    }

  }

  return (

  <div className="min-h-screen flex bg-slate-100">

    <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-700 to-indigo-800 text-white items-center justify-center">

      <div className="text-center">

        <img
          src={logo}
          alt="CampusConnect"
          className="w-40 mx-auto mb-6"
        />

        <h1 className="text-5xl font-bold">
          CampusConnect
        </h1>

        <p className="mt-4 text-xl text-blue-100">
          Student & Placement Portal
        </p>

      </div>

    </div>

    <div className="flex-1 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r
from-blue-600
to-indigo-700
hover:scale-105
transition-all
duration-300
rounded-xl hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  </div>

)

}

export default Login