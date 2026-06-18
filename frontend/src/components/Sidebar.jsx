import { Link } from "react-router-dom"
import { getUserRole } from "../utils/auth"

function Sidebar() {
  const role = getUserRole()


  return (

    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        CampusConnect
      </h1>

      <div className="flex flex-col gap-3">

        <Link
          to="/"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          📊 Dashboard
        </Link>
      {
  role === "student" && (

    <Link
      to="/profile"
      className="block p-3 rounded-lg hover:bg-slate-700"
    >
      👤 Profile
    </Link>

  )
}

        {
  role === "admin" && (

    <Link
      to="/students"
      className="p-3 rounded-lg hover:bg-slate-700"
    >
      🎓 Students
    </Link>

  )
}

        <Link
          to="/academics"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          📚 Academics
        </Link>

        <Link
          to="/placements"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          💼 Placements
        </Link>

        <Link
          to="/sports"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          🏆 Sports
        </Link>
        

      </div>

    </div>

  )

}

export default Sidebar