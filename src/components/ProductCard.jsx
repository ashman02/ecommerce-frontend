import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({
  title,
  img,
  price,
  id,
}) => {

  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/productdetail/${id}`) }
      className='dark:bg-[#1e2025] bg-[#d4caca] w-[45%] md:w-[30%] lg:w-[18%] h-1/3 cursor-pointer rounded-sm shadow-sm'>
      <div className='md:h-56 h-32 overflow-hidden rounded-t-sm'>
        <img src={img} alt="" />
      </div>
      <div className="text py-3 px-2">
        <h3 className='md:text-lg font-semibold min-h-14 max-h-14 overflow-hidden leading-4'>{title}</h3>
        <div>{price}$</div>
          
      </div>
    </div>
  )
}

export default ProductCard
