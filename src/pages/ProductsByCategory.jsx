import React, { useEffect, useState } from "react"
import { Container, ProductCard, Loader } from "../components"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { login } from "@/redux/features/auth/authSlice"
import { useToast } from "@/components/ui/use-toast"
import axiosInstance from "@/utils/axiosConfig"

const ProductsByCategory = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [products, setProducts] = useState([])

  const currentUser = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()
  const {toast} = useToast()

  const {categoryId } = useParams()
  const getProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(
        `category/get-products/${categoryId}`
      )
      setProducts(response.data.data[0]?.products)
      setIsError(false)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const addToCart = async (productId) => {
    try {
      const response = await axiosInstance.patch(
        `users/addto-cart/${productId}`
      )
      dispatch(login(response.data.data))
      toast({
        title: "Success",
        description: response.data.message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not save the product",
      })
    }
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center my-32">
        <h1 className="font-bold text-xl md:text-3xl text-center">
          Currently no product under this category
        </h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-32">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Container>
        <div className="flex gap-5 flex-wrap items-center justify-center">
          {
            products.map((product) => (
              <ProductCard key={product._id} id={product._id} title={product.title} price={product.price} img={product.image[0]} ownerImg={product.owner?.avatar || "images/default-user.png"} ownerUsername={product.owner?.username} saved={currentUser?.cart.includes(product._id) ? true : false} handleAddToCart={addToCart}/>
            ))
          }
        </div>
      </Container>
    </>
  )
}

export default ProductsByCategory
