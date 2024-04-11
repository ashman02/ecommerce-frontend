import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, CartCard, Container } from "../components"
import { removeFromCart, checkItem, increaseQuantity, decreaseQuantity } from "../redux/features/cart/cartSlice"
import {useNavigate} from "react-router-dom"

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
            <CartCard key={item.id} title={item.title} selected={item.selected} id={item.id} img={item.image} price={item.price} quantity={item.quantity}
              handleRemove={() => { dispatch(removeFromCart(item.id)) }}
              handleCheck={() => { dispatch(checkItem(item.id)) }}
              handleDecreaseQuantity={() => { dispatch(decreaseQuantity(item.id)) }}
              handleIncreaseQuantity={() => {dispatch(increaseQuantity(item.id))}} />
          ))
        )}
      </div>
      {cartItems.length > 0 && <div className='fixed text-center bottom-2 w-svw z-10'>
        <Button bg='bg-slate-900' paddingX='md:px-[120px] px-[50px]' 
       handleClick={() => navigate("/buy")}>Place Order</Button>
      </div>}
    </Container>
  )
}

export default Cart
