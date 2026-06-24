import { getUserRole,  getUsername
 } from "../utils/auth"

function Navbar() {

  const role = getUserRole()
  const username = getUsername()

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
          3
        </span>

      </button>

      <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

        {role.toUpperCase()}

      </div>

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

          {username?.charAt(0).toUpperCase()}

        </div>

        <div>

          <p className="font-semibold text-slate-800">
            {username}
          </p>

          <p className="text-sm text-gray-500">
            Welcome Back
          </p>

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
      >
        Logout
      </button>

    </div>

  </div>

)

}

export default Navbar