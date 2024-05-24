import React, { useEffect, useRef, useState } from "react"
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
import { Loader2 } from "lucide-react"

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [product, setProduct] = useState([])
  const [isInCart, setIsInCart] = useState(false)
  const [commentError, setCommentError] = useState(false)
  const [comments, setComments] = useState([])

  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const commentInput = useRef()

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

  const fetchProductComments = async () => {
    try {
      const response = await axios.get(`/api/v1/comments/${productId}`)
      setCommentError(false)
      setComments(response.data.data)
    } catch (error) {
      setCommentError(true)
    }
  }

  useEffect(() => {
    fetchProductDetails()
    if (authStatus) {
      if (userData?.cart?.includes(productId)) {
        setIsInCart(true)
      }
    }
    fetchProductComments()
  }, [authStatus])

  const addToCart = async () => {
    try {
      const response = await axios.patch(
        `/api/v1/users/addto-cart/${productId}`
      )
      setIsInCart(true)
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

  const submitComment = async () => {
    if (commentInput.current.value.length > 10) {
      setIsSubmittingComment(true)
      try {
        await axios.post(`/api/v1/comments/${productId}`, {
          content: commentInput.current.value,
        })
        fetchProductComments()
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while submitting comment",
          variant: "destructive",
        })
      } finally {
        setIsSubmittingComment(false)
      }
    } else {
      toast({
        title: "Input",
        description: "comment must be 10 characters long",
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
            <Carousel className="w-1/2 md:w-full max-w-xs mx-auto max-h-80">
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
          <div className="text-center md:w-[40%] lg:w-1/2">
            <div>
              <h1 className="font-bold text-xl md:text-3xl">{product.title}</h1>
              <p className="text-lg">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mx-6 py-6">
              <p className="font-bold text-xl md:text-3xl">₹{product.price}</p>
              {product.gender && <p>{product.gender}</p>}
            </div>
            <div
              className="flex items-center gap-3 pl-6 cursor-pointer"
              onClick={() => {
                navigate(`/${product.owner?.username}`)
              }}
            >
              <img
                src={product.owner?.avatar || "/images/default-user.png"}
                alt=""
                className="rounded-full h-10 w-10 md:w-12 md:h-12"
              />
              <h3 className="font-semibold text-xl">
                {product.owner?.username}
              </h3>
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
                  className="h-8 px-10"
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
        <Separator />
        <div className="mx-6 flex md:flex-row flex-col md:w-3/4 gap-1 md:gap-0 md:mx-auto py-4 items-center ">
          <input
            ref={commentInput}
            type="text"
            placeholder="share you valuable thoughts"
            className="relative w-full focus:outline-none dark:bg-[#020817] border-[.5px] border-gray-300 border-solid rounded-md py-[7px] pl-3 pr-3 md:pr-6"
          />
          <Button
            className="h-[39px] md:rounded-l-none md:absolute right-24 focus-visible:none"
            onClick={submitComment}
            disabled={isSubmittingComment}
          >
            {isSubmittingComment ? (
              <div className="flex">
                <Loader2 className="animate-spin" /> 
                <span>Submitting</span>
              </div>
            ) : (
              "Add Comment"
            )}
          </Button>
        </div>
        {!authStatus ? (
          <div className="flex items-center justify-center gap-2 flex-col py-3">
            <p className=" font-bold text-xl md:text-3xl">
              Login to see comments
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                navigate("/sign-in")
              }}
            >
              Login
            </Button>
          </div>
        ) : commentError ? (
          <div className="md:mx-auto md:w-3/4 mx-6 py-3 font-semibold text-lg">
            Be the first to comment
          </div>
        ) : (
          <div className="mx-6 py-3 flex flex-col gap-3 md:mx-auto md:w-3/4">
            {comments?.map((comment) => (
              <div key={comment._id}>
                <div className="flex items-center gap-3 ">
                  <img
                    src={comment.owner?.avatar || "/images/default-user.png"}
                    alt="user-avatar"
                    className="rounded-full h-10 w-10 md:w-12 md:h-12 cursor-pointer"
                    onClick={() => {
                      navigate(`/${comment.owner?.username}`)
                    }}
                  />
                  <h3
                    className="font-semibold text-lg md:text-xl cursor-pointer"
                    onClick={() => {
                      navigate(`/${comment.owner?.username}`)
                    }}
                  >
                    {comment.owner?.username}
                  </h3>
                </div>
                <div className="md:text-lg">{comment.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default ProductDetail
