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

function App() {
  const role = getUserRole()

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

                  <Navbar />

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
                      path="/students"
                      element={<Students />}
                    />

                    <Route
                      path="/academics"
                      element={<Academics />}
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
  element={<Profile />}
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