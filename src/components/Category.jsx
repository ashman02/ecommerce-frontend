import React from 'react'
import { useNavigate } from 'react-router-dom'

const Category = ({
  img, 
  title,
  id,
}) => {
  
  const navigate = useNavigate()
  return (
    <div className='bg-gray-300 w-60 min-h-[300px] pb-3 cursor-pointer'
    onClick={() => navigate(`/category/${title}/${id}`)}>
     <img src={img} alt=""
     className='w-60 min-h-60 max-h-60 object-cover' />
     <h1 className='font-semibold text-center md:text-2xl pt-3'>{title}</h1>
    </div>
  )
}

export default Category
