import React from 'react'

const Button = ({
    type="button",
    children,
    bg="bg-slate-400",
    textColor = "text-white",
    classes = "",
    handleClick,
    ...props 
}) => {
  return (
    <div className='ml-8'>
      <button
      type={type}
      {...props}
       className={`${bg} ${textColor} py-2 px-3 rounded-md text-lg`}> {children} </button>
    </div>
  )
}

export default Button
