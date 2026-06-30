import { getUserRole, getUsername } from "../utils/auth"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
function Navbar() {

  const role = getUserRole()
  const username = getUsername()
  const [noticeCount, setNoticeCount] = useState(0)
  const [open, setOpen] = useState(false)

const menuRef = useRef(null)
  useEffect(() => {

  axios
    .get(
      "https://campusconnect-fullstack.onrender.com/notices"
    )
    .then((res) => {

      setNoticeCount(res.data.length)

    })

}, [])
useEffect(() => {

  const closeMenu = (e) => {

    if (
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {

      setOpen(false)

    }

  }

  document.addEventListener(
    "mousedown",
    closeMenu
  )

  return () => {

    document.removeEventListener(
      "mousedown",
      closeMenu
    )

  }

}, [])
  const handleLogout = () => {

    localStorage.removeItem("token")

    window.location.href = "/login"

  }

  return (

  <div className="bg-white rounded-2xl shadow-lg px-8 py-5 flex justify-between items-center mb-6">

    <div>

      <h1 className="text-3xl font-bold text-slate-800">
        CampusConnect
      </h1>

      <p className="text-gray-500">
        Student Management & Placement Portal
      </p>

    </div>

    <div className="flex items-center gap-5">

      <button className="relative text-2xl">

        🔔

        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {noticeCount}
        </span>

      </button>

      <div
  className="relative"
  ref={menuRef}
>

  <button
    onClick={() =>
      setOpen(!open)
    }
    className="flex items-center gap-3 hover:bg-slate-100 rounded-xl p-2 transition"
  >

    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

      {username?.charAt(0).toUpperCase()}

    </div>

    <div className="text-left">

      <p className="font-semibold">
        {username}
      </p>

      <p className="text-sm text-gray-500">

        {role.toUpperCase()}

      </p>

    </div>

    <span className="text-gray-500">
      ▼
    </span>

  </button>

  {

    open && (

      <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">

        <Link
          to="/profile"
          className="block px-5 py-3 hover:bg-gray-100"
        >
          👤 My Profile
        </Link>

        <Link
          to="/change-password"
          className="block px-5 py-3 hover:bg-gray-100"
        >
          🔑 Change Password
        </Link>

        <button
          className="w-full text-left px-5 py-3 hover:bg-gray-100"
        >
          🌙 Dark Mode
        </button>

        <button
          className="w-full text-left px-5 py-3 hover:bg-gray-100"
        >
          ⚙ Settings
        </button>

        <hr />

        <button
          onClick={handleLogout}
          className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
        >
          🚪 Logout
        </button>

      </div>

    )

  }

</div>

    </div>

  </div>

)

}

export default Navbar