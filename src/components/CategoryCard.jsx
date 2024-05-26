import React from 'react'
import { useNavigate } from 'react-router-dom'

const Category = ({
  img, 
  title,
  id,
}) => {
  
  const navigate = useNavigate()
  return (
    <div className='dark:bg-secDark bg-secLight w-[45%] md:w-[30%] lg:w-[18%] h-1/3 cursor-pointer rounded-sm shadow-sm'
    onClick={() => navigate(`/category/${title}/${id}`)}>
      <div className='md:h-56 h-32 overflow-hidden rounded-t-sm'>

     <img src={img} alt="category-image"/>
      </div>

     <h1 className='font-semibold text-center md:text-xl py-3'>{title}</h1>
    </div>
  )
}

export default Category
