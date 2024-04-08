import { Outlet } from "react-router-dom"
import { Navbar } from "./components"
import { useEffect } from "react"

function App() {

  // useEffect(() => {
  //   alert("all the products are dummy and I am really sorry if you found something wrong.")
  
  // }, [])
  

  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App
