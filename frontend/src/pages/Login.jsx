import { useState } from "react"
import axios from "axios"

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "https://campusconnect-backend-qskx.onrender.com/login",
        {
          username,
          password
        }
      )

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      alert("Login Successful")

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

    <div className="max-w-md mx-auto mt-20">

      <div className="bg-white shadow rounded-xl p-6">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  )

}

export default Login