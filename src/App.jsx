import { Outlet, useLocation } from "react-router-dom"
import { Footer, Navbar } from "./components"


function App() {
  const location = useLocation()
  const noNavbarRoutes = ["/sign-up", "/sign-in"]
  return (
    <>
    {!noNavbarRoutes.includes(location.pathname) && <Navbar/>}
    <Outlet/>
    {!noNavbarRoutes.includes(location.pathname) && <Footer/>}
    </>
  )
}

export default App
