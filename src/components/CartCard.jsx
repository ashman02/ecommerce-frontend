import React from 'react'
import Button from "./Button"
import { useNavigate } from 'react-router-dom'


const CartCard = ({
  title,
  img,
  id,
  price,
  quantity,
}) => {
  const navigate = useNavigate()

  return (
    <div className='bg-gray-300  lg:w-[48%]'>
      <div className=' flex gap-3 bg-[#f8fbff] pr-2' >
        <div className='shadow-xl cursor-pointer'
          onClick={() => navigate(`/productdetail/${id}`)}>
          <img src={img} alt=""
            className='w-32 drop-shadow-lg mx-1 mt-1' />
        </div>

        <div className="text w-full">
          <div className='title-info'>
            <div className="title flex justify-between">
              <h1 className='md:text-xl text-base font-bold md:w-[60%] leading-[1.3rem] cursor-pointer'
                onClick={() => navigate(`/productdetail/${id}`)}>{title}</h1>
              <div>
                <img src="/images/cross.svg" alt="" className='w-7' />
              </div>
            </div>
            <div className='md:text-lg'>Quantity: {quantity}</div>
          </div>
          <div className='price-btn flex justify-between items-center'>
            <div className='price font-bold md:text-xl'>{price}$</div>
            <div className="buttons">
              <button disabled={quantity === 1} className='bg-[#898f9942] rounded-full mr-1 py-1 px-3'>
                -
              </button>
              <button disabled={quantity >= 10} className='bg-[#898f9952] rounded-full py-1 px-3'>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center py-3'>
        <Button>Buy Now</Button>
      </div>
    </div>


  )
}

export default CartCard
