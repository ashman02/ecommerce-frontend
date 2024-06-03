import React, { useEffect, useState, lazy, Suspense } from "react"
import { ProductCard, Container, Loader } from "../components"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { login } from "@/redux/features/auth/authSlice"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import axiosInstance from "axiosConfig"

const HomeCategory = lazy(() => import("../components/HomeCategory"))

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isProductLoading, setIsProductLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const {toast} = useToast()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.auth.data)


  const getCategories = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("category/get-categories")
      setCategories(response.data.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const getProducts = async () => {
    setIsProductLoading(true)
    try {
      const response = await axiosInstance.get("products/home-products")
      setProducts(response.data.data)
      setIsProductLoading(false)
    } catch (error) {
      setIsProductLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
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


  return (
    <>
      <Container>
        <div
          className="cat-container flex gap-5 overflow-x-scroll"
        >
          {categories.map((category) => (
            <Suspense key={category._id} fallback={
              <div key={category._id} className="flex items-center justify-center flex-col gap-2">
            <div>
              <Skeleton className="rounded-full h-12 w-12 md:w-16 md:h-16"/>
            </div>
            <div>
              <Skeleton className="w-20 h-4 pb-1"/>
            </div>
              </div>
          }>
              <HomeCategory key={category._id} id={category._id} title={category.title} img={category.image}/>
            </Suspense>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {isProductLoading ? (
            <div className="flex justify-center items-center w-full">
              <Loader />
            </div>
          ) : (
            // check sorting of this section
            products.map(product => (
              <ProductCard key={product._id} title={product.title} price={product.price} id={product._id} img={product.image[0]} ownerImg={product.owner.avatar || "/images/default-user.png"} ownerUsername={product.owner.username} saved={currentUser?.cart.includes(product._id) ? true : false} handleAddToCart={addToCart}/>
            ))
          )}
        </div>
      </Container>
    </>
  )
}

export default Home
