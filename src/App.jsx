import { Outlet, useLocation } from "react-router-dom"
import { Footer, Loader, Navbar } from "./components"
import { Toaster } from "./components/ui/toaster"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "./redux/features/auth/authSlice.js"
import axiosInstance from "@/utils/axiosConfig"

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const noNavbarRoutes = ["/sign-up", "/sign-in", "/verify"]
  const [isFetching, setIsFetching] = useState(false)
  const auth = useSelector((state) => state.auth.status)

  //authentication
  useEffect(() => {
    const getCurrentUser = async () => {
      setIsFetching(true)
      try {
        const response = await axiosInstance.get("users/current-user")
        if (response) {
          dispatch(login(response.data?.data))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        dispatch(logout())
      } finally {
        setIsFetching(false)
      }
    }
    getCurrentUser()
  }, [auth])

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen" ><Loader/></div>
    )
  }

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
      <Toaster />
      {!noNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App
