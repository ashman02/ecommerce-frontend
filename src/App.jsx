import { Outlet, useLocation } from "react-router-dom"
import { Footer, Navbar } from "./components"
import { Toaster } from "./components/ui/toaster"


function App() {
  const location = useLocation()
  const noNavbarRoutes = ["/sign-up", "/sign-in", "/verify"]
  return (
    <>
    {!noNavbarRoutes.includes(location.pathname) && <Navbar/>}
    <Outlet/>
    <Toaster/>
    {!noNavbarRoutes.includes(location.pathname) && <Footer/>}
    </>
  )
}

export default App
