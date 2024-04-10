import React, { useRef, useState } from 'react'
import Button from "./Button"
import { useNavigate } from 'react-router-dom'



const CartCard = ({
  title,
  img,
  id,
  price,
  handleRemove,
  selected,
  display = "block",
  quantity,
  handleCheck,
  handleDecreaseQuantity,
  handleIncreaseQuantity
}) => {
  const navigate = useNavigate()

  return (
    <div className='outerdiv w-[70%] md:w-[30%] lg:w-[18%] h-1/3 ' >
      <input onChange={handleCheck}  className='translate-y-6 ml-1' type="checkbox" name="select" id="cartCheck" checked={selected}  />
      <div className='bg-gray-300 pb-3'>
        <div className='h-56 overflow-hidden cursor-pointer'>
          <img src={img} alt=""
            onClick={() => navigate(`/productdetail/${id}`)} />
        </div>
        <div className="text py-3 px-2">
          <h3 className='md:text-lg font-semibold cursor-pointer min-h-14 max-h-14 overflow-hidden'
            onClick={() => navigate(`/productdetail/${id}`)}>{title}</h3>
          <div>{price}$</div>
        </div>

        <div className="quantity flex justify-between px-2">
          <div>
            Quantity: {quantity}
          </div>
          <div className={`${display}`}>
            <button disabled={quantity === 1} onClick={handleDecreaseQuantity} className='text-lg rounded-full  py-1 px-3'>
              -
            </button>
            <button disabled={quantity === 10} onClick={handleIncreaseQuantity} className=' text-lg rounded-full py-1 px-3'>
              +
            </button>
          </div>
        </div>

        <div className={`buy-remove flex justify-center p-2 ${display}`}>
          <Button bg='bg-red-500' handleClick={handleRemove} >
            Remove
          </Button>
        </div>

      </div>


    </div>

  )
}

export default CartCard
