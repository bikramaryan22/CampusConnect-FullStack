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

    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          CampusConnect
        </h1>

        <p className="text-gray-500">
          Student Management Portal
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="bg-slate-100 px-4 py-2 rounded-lg">

          <span className="font-semibold">
            {username} ({role})
          </span>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>

  )

}

export default Navbar