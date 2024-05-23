import React, { useEffect, useState } from "react"
import { Container, Loader } from "../components"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [product, setProduct] = useState([])
  const [isInCart, setIsInCart] = useState(false)

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.data)

  const { productId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const fetchProductDetails = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/v1/products/product/${productId}`)
      setProduct(response.data.data[0])
      setIsLoading(false)
      setError(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Product not found",
      })
      setError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
    if (authStatus) {
      if (userData?.cart?.includes(productId)) {
        setIsInCart(true)
      }
    }
  }, [])

  const addToCart = async () => {
    try {
      const response = await axios.patch(`/api/v1/users/addto-cart/${productId}`)
      setIsInCart(true)
      toast({
        title : "Success",
        description : response.data.message
      })
    } catch (error) {
      toast({
        title : "Error",
        description :"Could not save the product"
      })
    }
  }

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center my-32">
        <h1 className="font-bold text-xl md:text-3xl text-center">
          404! Product not found
        </h1>
      </div>
    )
  }

  return (
    <Container>
      <div>
        <div className="w-full overflow-y-hidden md:flex items-center justify-center gap-10 pb-4">
          <div className="carousel">
            <Carousel className="w-1/2 md:w-full max-w-xs mx-auto">
              <CarouselContent>
                {product.image?.map((img) => (
                  <CarouselItem key={img}>
                    <Link to={img} target="_blank">
                      <img
                        src={img}
                        alt="product-image"
                        className="rounded-sm"
                      />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="text-center">
            <div>
              <h1 className="font-bold text-xl md:text-3xl">{product.title}</h1>
              <p className="text-lg">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mx-6 py-6">
              <p className="font-bold text-xl md:text-3xl">₹{product.price}</p>
              {product.gender && <p>{product.gender}</p>}
            </div>
            <div className="flex items-center gap-3 pl-6 cursor-pointer"
            onClick={() => {navigate(`/${product.owner?.username}`)}}
            >
              <img
                src={product.owner?.avatar}
                alt=""
                className="rounded-full h-10 w-10 md:w-12 md:h-12"
              />
              <h3>{product.owner?.username}</h3>
            </div>
            <div className="save">
              {isInCart ? (
                <Button
                  onClick={() => {
                    navigate("/cart")
                  }}
                  variant="outline"
                >
                  Go to cart
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (!authStatus) {
                      navigate("/sign-in")
                    } else {
                      addToCart()
                    }
                  }}
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
        <Separator />
        {
          !authStatus ? (
            <div className="flex items-center justify-center gap-2 flex-col py-3">
              <p className=" font-bold text-xl md:text-3xl">Login to see comments</p>
              <Button variant="ghost" onClick={() => { navigate('sign-in')}}>Login</Button>
            </div>
          ) : (
            <div>
              Comment Section
            </div>
          )
        }
      </div>
    </Container>
  )
}

export default ProductDetail
