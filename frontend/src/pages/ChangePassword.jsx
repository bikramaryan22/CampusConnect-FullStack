import { useState } from "react"
import axios from "axios"

function ChangePassword() {

  const [oldPassword, setOldPassword] =
    useState("")

  const [newPassword, setNewPassword] =
    useState("")

  const username =
    localStorage.getItem("username")

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        "https://campusconnect-fullstack.onrender.com/change-password",
        {
          username,
          old_password: oldPassword,
          new_password: newPassword
        }
      )

      alert(
        "Password Changed Successfully"
      )

      window.location.href = "/"

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Failed"
      )

    }

  }

  return (

    <div className="max-w-md mx-auto mt-20">

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Change Password
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-3 rounded-lg w-full"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>

  )

}

export default ChangePassword