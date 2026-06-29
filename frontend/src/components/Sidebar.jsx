import { Link } from "react-router-dom"
import { getUserRole } from "../utils/auth"

function Sidebar() {
  const role = getUserRole()


  return (

  <div className="w-72 min-h-screen bg-slate-950 text-white flex flex-col shadow-2xl">

    <div className="border-b border-slate-800 p-6">

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

    </div>

    <div className="flex-1 p-4">

      <div className="text-slate-500 text-xs uppercase mb-3">
        Main Menu
      </div>

      <div className="flex flex-col gap-2">

        <Link
          to="/"
          className="p-3 rounded-xl hover:bg-blue-600 transition"
        >
          📊 Dashboard
        </Link>

        {
          role === "student" && (

            <Link
              to="/profile"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              👤 My Profile
            </Link>

          )
        }

        {
          role === "admin" && (

            <Link
              to="/students"
              className="p-3 rounded-xl hover:bg-blue-600 transition"
            >
              🎓 Students
            </Link>

          )
        }

        <Link
          to="/academics"
          className="p-3 rounded-xl hover:bg-blue-600 transition"
        >
          📚 Academics
        </Link>
        {
  role === "admin" && (

    <Link
      to="/admin-fees"
      className="
p-3
rounded-xl
hover:bg-slate-800
hover:translate-x-2
transition-all
duration-200
"
    >
      💰 Fee Management
    </Link>

  )
}
        <Link
  to="/notices"
  className="p-3 rounded-xl hover:bg-blue-600 transition"
>
  📢 Notices
</Link>
        <Link
          to="/placements"
          className="p-3 rounded-xl hover:bg-blue-600 transition"
        >
          💼 Placements
        </Link>
<Link
  to="/attendance"
  className="p-3 rounded-xl hover:bg-blue-600 transition"
>
  📅 Attendance
</Link>
        <Link
          to="/sports"
          className="p-3 rounded-xl hover:bg-blue-600 transition"
        >
          🏆 Sports
        </Link>
        {
  role === "student" && (

    <Link
      to="/fees"
      className="
      p-3
      rounded-xl
      hover:bg-slate-800
      hover:translate-x-2
      transition-all
      duration-200
      "
    >
      💰 Fees
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