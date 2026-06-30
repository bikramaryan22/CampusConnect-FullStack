import { getUserRole, getUsername } from "../utils/auth"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
function Navbar({

  darkMode,

  setDarkMode

}) {

  const role = getUserRole()
  const username = getUsername()
  const [noticeCount, setNoticeCount] = useState(0)
  const [notices, setNotices] = useState([])
const [showNotifications, setShowNotifications] = useState(false)
  const [open, setOpen] = useState(false)

const menuRef = useRef(null)
  useEffect(() => {

  axios
    .get(
      "https://campusconnect-fullstack.onrender.com/notices"
    )
    .then((res) => {

  setNoticeCount(res.data.length)

  setNotices(res.data)

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

      <div className="relative">

  <button
    onClick={() =>
      setShowNotifications(!showNotifications)
    }
    className="relative text-2xl"
  >

    🔔

    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {noticeCount}
    </span>

  </button>

  {

    showNotifications && (

      <div
  className="
  absolute
  right-0
  mt-3
  w-80
  bg-white
  rounded-2xl
  shadow-2xl
  border
  z-50
  overflow-hidden
  animate-[fadeIn_.2s_ease]
  "
>

        <div className="p-4 font-bold border-b">

          Notifications

        </div>

        {

          notices.length === 0 ? (

            <p className="p-4 text-gray-500">

              No notifications

            </p>

          ) : (

            notices.slice(0,5).map((notice) => (

              <div
                key={notice.id}
                className="p-4 border-b hover:bg-slate-50"
              >

                <p className="font-semibold">

                  📢 {notice.title}

                </p>

                <p className="text-sm text-gray-500 mt-1">

                  {notice.description}

                </p>

              </div>

            ))

          )

        }

      </div>

    )

  }

</div>

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

      <div
  className="
  absolute
  right-0
  mt-3
  w-60
  bg-white
  rounded-2xl
  shadow-2xl
  border
  z-50
  overflow-hidden
  animate-[fadeIn_.2s_ease]
  "
>

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

  onClick={() =>

    setDarkMode(!darkMode)

  }

  className="w-full text-left px-5 py-3 hover:bg-gray-100"

>

  {

    darkMode

      ? "☀ Light Mode"

      : "🌙 Dark Mode"

  }

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