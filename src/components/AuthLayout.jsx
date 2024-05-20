import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Loader } from "."

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/sign-in")
    } else if (!authentication && authStatus) {
      navigate("/")
    }
    setIsLoading(false)
  }, [authentication, authStatus, navigate])

  return isLoading ? <Loader/> : <>{children}</>
}

export default Protected
