import { jwtDecode } from "jwt-decode"

export const getUserRole = () => {

  const token = localStorage.getItem("token")

  if (!token) return null

  try {

    const decoded = jwtDecode(token)

    return decoded.role

  } catch {

    return null

  }

}

export const getUsername = () => {

  const token = localStorage.getItem("token")

  if (!token) return null

  try {

    const decoded = jwtDecode(token)

    return decoded.sub

  } catch {

    return null

  }

}

export const getToken = () => {
  return localStorage.getItem("token")
}