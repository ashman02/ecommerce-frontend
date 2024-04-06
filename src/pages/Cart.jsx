import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CartCard, Container } from "../components"
import { removeFromCart } from "../redux/features/cart/cartSlice"

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()

  return (
    <Container>
      <div className='flex flex-wrap gap-5 items-center justify-center'>

        {cartItems.length === 0 ? (
          <div className='flex items-center justify-center mt-24'>
            <h1 className='text-xl md:text-3xl font-bold text-slate-400'>Your Cart is Empty</h1>
            {/* later work fetch some products from api encourage user to buy those. */}
          </div>
        ) : (
          cartItems.map(item => (
            <CartCard key={item.id} title={item.title} id={item.id} img={item.image} price={item.price} handleRemove={() => {
              dispatch(removeFromCart(item.id))

            }}
              handleBuy={() => { console.log("Buying") }} />
          ))
        )}
      </div>
    </Container>
  )
}

export default Cart
