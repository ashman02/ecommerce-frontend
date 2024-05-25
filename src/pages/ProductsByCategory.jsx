import React, { useEffect, useState } from "react"
import { Container, ProductCard, Loader } from "../components"
import { useParams } from "react-router-dom"
import axios from "axios"

const ProductsByCategory = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [products, setProducts] = useState([])

  const {categoryId } = useParams()
  const getProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `/api/v1/category/get-products/${categoryId}`
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
              <ProductCard key={product._id} id={product._id} title={product.title} price={product.price} img={product.image[0]} ownerImg={product.owner?.avatar} ownerUsername={product.owner?.username}/>
            ))
          }
        </div>
      </Container>
    </>
  )
}

export default ProductsByCategory
