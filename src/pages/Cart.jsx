import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CartCard, Container } from "../components"

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cart)
  const [empty, setEmpty] = useState(true)



  useEffect(() => {
    if (cartItems.length > 0) {
      setEmpty(false)
    }
  })



  if (empty) {
    return <div className='flex items-center justify-center mt-24'>
      <h1 className='text-xl md:text-3xl font-bold text-slate-400'>Your Cart is Empty</h1>
      {/* later work fetch some products from api encourage user to buy those. */}
    </div>
  }

  return (
    <Container>
      <div className='flex flex-wrap gap-5 items-center justify-center'>
        {cartItems.map(item => (
          <CartCard key={item.id} title={item.title} id={item.id} quantity={item.itemQuantity}
            img={item.image} price={item.price}  />
        ))}

      </div>
    </Container>
  )
}

export default Cart
