import React from 'react'

const Button = ({
    type="button",
    children,
    bg="bg-slate-400",
    textColor = "text-white",
    classes = "",
    paddingX = "px-3",
    handleClick,
    ...props 
}) => {
  return (
    <div className=''>
      <button
      type={type}
      {...props}
       className={`${bg} ${textColor} ${paddingX} py-2 rounded-md text-lg`}
       onClick={handleClick}
       > {children} </button>
    
    </div>
  )
}

export default Button
