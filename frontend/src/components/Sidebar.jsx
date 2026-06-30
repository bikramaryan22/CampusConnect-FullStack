import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUserRole } from "../utils/auth"

function Sidebar() {
  const role = getUserRole()
  const [collapsed, setCollapsed] = useState(() => {

  return localStorage.getItem("sidebar") === "collapsed"

})

useEffect(() => {

  localStorage.setItem(

    "sidebar",

    collapsed ? "collapsed" : "expanded"

  )

}, [collapsed])


  return (

  <div
  className={`
    ${collapsed ? "w-20" : "w-72"}
    min-h-screen
    bg-slate-950
    text-white
    flex
    flex-col
    shadow-2xl
    transition-all
    duration-300
  `}
>

    <div className="border-b border-slate-800 p-6">

  <div className="flex justify-between items-center">

    {
      !collapsed && (

        <div className="flex items-center gap-3">

          <div className="text-4xl">
            🎓
          </div>

          <div>

            <h1 className="text-2xl font-bold">
              CampusConnect
            </h1>

            <p className="text-slate-400 text-sm">
              Student Portal
            </p>

          </div>

        </div>

      )
    }

    {
      collapsed && (

        <div className="text-4xl mx-auto">
          🎓
        </div>

      )
    }

    <button
      onClick={() =>
        setCollapsed(!collapsed)
      }
      className="text-2xl hover:text-blue-400 transition"
    >
      ☰
    </button>

  </div>

</div>

    <div className="flex-1 p-4">

      {!collapsed && (

  <div className="text-slate-500 text-xs uppercase mb-3">
    Main Menu
  </div>

)}

      <div className="flex flex-col gap-2">

        <Link
  to="/"
  className={`p-3 rounded-xl hover:bg-blue-600 transition flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Dashboard"
>
  <span className="text-2xl">📊</span>

  {!collapsed && <span>Dashboard</span>}
</Link>

        {
          role === "student" && (

            <Link
  to="/profile"
  className={`p-3 rounded-xl hover:bg-blue-600 transition flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="My Profile"
>
  <span className="text-2xl">👤</span>

  {!collapsed && <span>My Profile</span>}
</Link>

          )
        }

        {
          role === "admin" && (

            <Link
  to="/students"
  className={`p-3 rounded-xl hover:bg-blue-600 transition flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Students"
>
  <span className="text-2xl">🎓</span>

  {!collapsed && <span>Students</span>}
</Link>

          )
        }

        
        <Link
  to="/academics"
  className={`p-3 rounded-xl hover:bg-blue-600 transition flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Academics"
>
  <span className="text-2xl">📚</span>

  {!collapsed && <span>Academics</span>}
</Link>
        {
  role === "admin" && (

    <Link
  to="/admin-fees"
  className={`p-3 rounded-xl hover:bg-slate-800 hover:translate-x-2 transition-all duration-200 flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Fee Management"
>
  <span className="text-2xl">💰</span>

  {!collapsed && <span>Fee Management</span>}
</Link>

  )
}
        <Link
  to="/notices"
  className={`p-3 rounded-xl hover:bg-blue-600 transition flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Notices"
>
  <span className="text-2xl">📢</span>

  {!collapsed && <span>Notices</span>}
</Link>
        <Link
  to="/placements"
  className={`p-3 rounded-xl hover:bg-blue-600 transition flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Placements"
>
  <span className="text-2xl">💼</span>

  {!collapsed && <span>Placements</span>}
</Link>
<Link
  to="/attendance"
  className={`p-3 rounded-xl hover:bg-blue-600 transition flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Attendance"
>
  <span className="text-2xl">📅</span>

  {!collapsed && <span>Attendance</span>}
</Link>
        <Link
  to="/sports"
  className={`p-3 rounded-xl hover:bg-blue-600 transition flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Sports"
>
  <span className="text-2xl">🏆</span>

  {!collapsed && <span>Sports</span>}
</Link>
        {
  role === "student" && (

    <Link
  to="/fees"
  className={`p-3 rounded-xl hover:bg-slate-800 hover:translate-x-2 transition-all duration-200 flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  }`}
  title="Fees"
>
  <span className="text-2xl">💰</span>

  {!collapsed && <span>Fees</span>}
</Link>

  )
}

      </div>

    </div>

    <div className="border-t border-slate-800 p-4">

      <button
        onClick={() => {

          localStorage.clear()

          window.location.href =
            "/login"

        }}
        className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-xl transition"
      >
        🚪 Logout
      </button>

    </div>

  </div>

)

}

export default Sidebar