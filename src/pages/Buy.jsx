import React, { useEffect, useState } from 'react'
import { AddressForm, CartCard, Container, Payment, Button } from "../components"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Buy = () => {

  const buyItems = useSelector(state => state.cart.cart)
  const [selectedItems, setSelectedItems] = useState([])
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let price = 0
    let items = []
    buyItems.map(item => {
      if (item.selected === true) {
        price = price + item.price * item.quantity
        items.push(item)
      }
    })
    setTotal(price)
    setSelectedItems(items)
  }, [buyItems])

  if(selectedItems.length === 0){
    return (
      <div className='flex justify-center items-center my-32 flex-col'>
      <h1 className='font-bold text-slate-400 text-xl md:text-3xl'>No Prouducts to buy</h1>
      <Button
      handleClick={() => navigate("/")}>Home</Button>
    </div>
    )
  }

  return (
    <>
      <Container>
        <div className='flex gap-5 justify-center items-center flex-wrap my-40'>
          {selectedItems.length > 0 && selectedItems.map(item => (
            <CartCard key={item.id} img={item.image} title={item.title} quantity={item.quantity} price={item.price} id={item.id} display='hidden' />
          ))}
        </div>
        <div>
          <AddressForm />
        </div>
        <div className='payment-method my-10 lg:max-w-[60%] md:max-w-[80%] max-w-[97%] mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6'>
          <div>
            <h1 className='text-xl'>Payment Method</h1>
          </div>
          <div>
            <h1 className='text-2xl font-bold'>Total Price : {total}$</h1>
          </div>
          <div className="method">
           <Payment/>
          </div>
        </div>

      </Container>
    </>
  )
}

export default Buy
