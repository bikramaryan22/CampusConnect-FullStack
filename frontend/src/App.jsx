import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Academics from "./pages/Academics"
import Placements from "./pages/Placements"
import Sports from "./pages/Sports"
import Profile from "./pages/Profile"
import AdminDashboard from "./pages/AdminDashboard"
import { getUserRole } from "./utils/auth"
import ChangePassword from "./pages/ChangePassword"
import Notices from "./pages/Notices"
import Attendance from "./pages/Attendance"
import StudentDetails from "./pages/StudentDetails"
import FeePortal from "./pages/FeePortal"
import AdminFees from "./pages/AdminFees"
import { useEffect, useState } from "react"
function App() {
  const role = getUserRole()
  const [darkMode, setDarkMode] = useState(

  localStorage.getItem("theme") === "dark"

)
useEffect(() => {

  if (darkMode) {

    document.documentElement.classList.add("dark")

    localStorage.setItem(
      "theme",
      "dark"
    )

  }

  else {

    document.documentElement.classList.remove("dark")

    localStorage.setItem(
      "theme",
      "light"
    )

  }

}, [darkMode])

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/change-password"
  element={<ChangePassword />}
/>

        <Route
          path="*"
          element={

            <ProtectedRoute>

              <div className="flex min-h-screen bg-slate-100">

                <Sidebar />

                <div className="flex-1 p-6">

                  <Navbar

  darkMode={darkMode}

  setDarkMode={setDarkMode}

/>

                  <Routes>

                    <Route
  path="/"
  element={
    role === "admin"
      ? <AdminDashboard />
      : <Dashboard />
  }
/>
<Route

  path="/student/:id"

  element={<StudentDetails />}

/>

                    <Route
  path="/students"
  element={
    role === "admin"
      ? <Students />
      : <Dashboard />
  }
/>
                    <Route
  path="/notices"
  element={<Notices />}
/>

                    <Route
                      path="/academics"
                      element={<Academics />}
                    />
                    <Route
  path="/attendance"
  element={<Attendance />}
/>

                    <Route
                      path="/placements"
                      element={<Placements />}
                    />

                    <Route
                      path="/sports"
                      element={<Sports />}
                    />
<Route
  path="/profile"
  element={
    role === "student"
      ? <Profile />
      : <AdminDashboard />
  }
/>
<Route
  path="/fees"
  element={
    role === "student"
      ? <FeePortal />
      : <AdminDashboard />
  }
/>
<Route
  path="/admin-fees"
  element={
    role === "admin"
      ? <AdminFees />
      : <Dashboard />
  }
/>

                  </Routes>

                </div>

              </div>

            </ProtectedRoute>

          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App