import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "./components"
import { useEffect } from "react"

function App() {

  useEffect(() => {
    alert("Thank you for visiting and remember : all the products are dummy.")
  
  }, [])
  

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
