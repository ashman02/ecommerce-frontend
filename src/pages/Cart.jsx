import React, { useState, useEffect } from "react"
import { CartCard, Container, Loader } from "../components"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch } from "react-redux"
import { login } from "@/redux/features/auth/authSlice"
import axiosInstance from "axiosConfig"


const Cart = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const { toast } = useToast()
  const dispatch = useDispatch()

  const getCartItems = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("users/get-cart-items")
      setCartItems(response.data.data.cart)
      setIsEmpty(false)
      setIsLoading(false)
    } catch (error) {
      setIsEmpty(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCartItems()
  }, [])

  const removeFromCart = async (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId))
    try {
      const response = await axiosInstance.patch(`users/removefrom-cart/${productId}`)
      dispatch(login(response.data.data))
      toast({
        title: "Success",
        description: response.data.message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not remove the product",
      })
    }
  }

  if (isEmpty) {
    return <div className="font-bold md:text-2xl text-lg items-center">No Saved Items</div>
  }

  return (
    <Container>
      <div>
        {isLoading ? (
          <div><Loader/></div>
        ) : (
          <div className="flex gap-5 flex-wrap items-center justify-start ">
            {
              cartItems.map((product) => (
                <CartCard key={product._id} id={product._id} title={product.title} price={product.price} img={product.image[0]} ownerImg={product.owner?.avatar} ownerUsername={product.owner?.username} handleOnCrossClick={() => removeFromCart(product._id)}/>
              ))
            }
          </div>
        )}
      </div>
    </Container>
  )
}

export default Cart
