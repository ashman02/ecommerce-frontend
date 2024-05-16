import React from 'react'
import { useSelector } from 'react-redux'

const Verify = () => {
  const data = useSelector(state => state.signUp.value)
  const verifyCode = useSelector(state => state.verify.value)
  console.log(data)
  console.log(verifyCode)
  return (
    <div>
      Verify code we sent on your email
    </div>
  )
}

export default Verify
