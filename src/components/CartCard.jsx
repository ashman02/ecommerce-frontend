import React, { useState } from 'react'
import Button from "./Button"
import { useNavigate } from 'react-router-dom'



const CartCard = ({
  title,
  img,
  id,
  price,
  handleRemove,
  handleBuy,
}) => {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  const handleDecreaseQuantity = () => {
    if (quantity !== 1) {

      setQuantity(quantity - 1)
    }
  }

  const handleIncreaseQuantity = () => {
    if (quantity <= 10) {

      setQuantity(quantity + 1)
    }

  }


  return (
    <div className='outerdiv w-[70%] md:w-[30%] lg:w-[18%] h-1/3 ' >
      <div className='bg-gray-300 '>
        <div className='h-72 overflow-hidden cursor-pointer'>
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
          <div>
            <button disabled={quantity === 1} onClick={handleDecreaseQuantity} className='text-lg rounded-full  py-1 px-3'>
              -
            </button>
            <button disabled={quantity >= 10} onClick={handleIncreaseQuantity} className=' text-lg rounded-full py-1 px-3'>
              +
            </button>
          </div>
        </div>

        <div className="buy-remove flex justify-between p-2">
          <Button bg='bg-slate-900'
          handleClick={handleBuy}>Buy Now</Button>

          <Button bg='bg-red-500' handleClick={handleRemove} >
            Remove
          </Button>
        </div>

      </div>


    </div>

  )
}

export default CartCard
