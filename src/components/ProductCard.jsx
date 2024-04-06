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
      className='bg-gray-300 w-[70%] md:w-[30%] lg:w-[18%] h-1/3 cursor-pointer'>
      <div className='h-72 overflow-hidden'>
        <img src={img} alt="" />
      </div>
      <div className="text py-3 px-2">
        <h3 className='md:text-lg font-semibold min-h-14 max-h-14 overflow-hidden'>{title}</h3>
        <div>{price}$</div>
          
      </div>
    </div>
  )
}

export default ProductCard
