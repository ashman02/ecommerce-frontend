import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "./components"
import { useEffect } from "react"

function App() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
