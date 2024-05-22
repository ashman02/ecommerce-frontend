import React, { useEffect, useRef, useState } from "react"
import { ProductCard, Container, Loader } from "../components"
import axios from "axios"

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isProductLoading, setIsProductLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  //mouse scrolling
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(null)
  const [scrollLeft, setScrollLeft] = useState(0)

  const getCategories = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/v1/category/get-categories")
      setCategories(response.data.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const getProducts = async () => {
    setIsProductLoading(true)
    try {
      const response = await axios.get("/api/v1/products/home-products")
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

  //mouse scrolling functions
  const handleMouseDown = (event) => {
    if (event.button !== 0) return
    setIsDragging(true)
    setStartX(event.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (event) => {
    if (!isDragging) return
    const x = event.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <>
      <Container>
        <div
          className="flex gap-5 overflow-x-scroll no-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          ref={containerRef}
        >
          {categories.map((category) => (
            <div
              className="flex flex-col items-center justify-center"
              key={category._id}
            >
              <img
                src={category.image}
                alt={category.title}
                className="rounded-full h-12 w-12 md:w-16 md:h-16"
              />
              <h3 className="font-semibold md:text-lg">{category.title}</h3>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {isProductLoading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            // check sorting of this section
            products.map(product => (
              <ProductCard key={product._id} title={product.title} price={product.price} id={product._id} img={product.image[0]} ownerImg={product.owner.avatar} ownerUsername={product.owner.username}/>
            ))
          )}
        </div>
      </Container>
    </>
  )
}

export default Home
