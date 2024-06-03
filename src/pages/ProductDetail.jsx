import React, { useEffect, useRef, useState } from "react"
import { Container, Loader } from "../components"
import { Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login } from "@/redux/features/auth/authSlice.js"
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
import {
  Edit2,
  Loader2,
  LucideMoreVertical,
  MoreVertical,
  ThumbsUp,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [product, setProduct] = useState([])
  const [isInCart, setIsInCart] = useState(false)
  const [commentError, setCommentError] = useState(false)
  const [comments, setComments] = useState([])
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false)
  const [isDeletingProduct, setIsDeletingProduct] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeId, setLikeId] = useState(null)
  const [likeCount, setLikeCount] = useState(0)

  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const commentInput = useRef()
  const editCommentInput = useRef()

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.data)

  const { productId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const dispatch = useDispatch()

  const fetchProductDetails = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://chobarcart-api.onrender.com/api/v1/products/product/${productId}`)
      setProduct(response.data.data[0])
      if (authStatus) {
        if (userData?.cart?.includes(productId)) {
          setIsInCart(true)
        }
      }
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
      const response = await axios.get(`https://chobarcart-api.onrender.com/api/v1/comments/${productId}`)
      setCommentError(false)
      setComments(response.data.data)
    } catch (error) {
      setCommentError(true)
    }
  }

  const fetchProductLikes = async () => {
    try {
      const response = await axios.get(`https://chobarcart-api.onrender.com/api/v1/likes/product/${productId}`)
      setLikeCount(response.data.data.totalLikes)
      setIsLiked(response.data.data.isUserLiked)
      if(response.data.data.isUserLiked){
        setLikeId(response.data.data.likeId)
      }
    } catch (error) {
      setLikeCount(0)
    }
  }

  useEffect(() => {
    fetchProductDetails()
    fetchProductComments()
    fetchProductLikes()
  }, [authStatus])

  const addToCart = async () => {
    setIsInCart(true)
    try {
      const response = await axios.patch(
        `https://chobarcart-api.onrender.com/api/v1/users/addto-cart/${productId}`
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

  const submitComment = async () => {
    if (commentInput.current.value.length > 10) {
      setIsSubmittingComment(true)
      try {
        await axios.post(`https://chobarcart-api.onrender.com/api/v1/comments/${productId}`, {
          content: commentInput.current.value,
        })
        commentInput.current.value = ""
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

  const deleteComment = async (commentId) => {
    setComments(comments.filter((comment) => comment._id !== commentId))
    try {
      const response = await axios.delete(
        `https://chobarcart-api.onrender.com/api/v1/comments/update/${commentId}`
      )
      toast({
        title: "Success",
        description: response.data.message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting comment",
        variant: "destructive",
      })
    }
  }

  const updateComment = async (commentId) => {
    if (editCommentInput.current.value.length > 10) {
      try {
        const response = await axios.patch(
          `https://chobarcart-api.onrender.com/api/v1/comments/update/${commentId}`,
          {
            content: editCommentInput.current.value,
          }
        )
        editCommentInput.current.value = ""
        fetchProductComments()
        toast({
          title: "Success",
          description: response.data.message,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while updating comment",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "comment",
        description: "comment must be 10 characters long",
      })
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const updateProduct = async (data) => {
    setIsUpdatingProduct(true)
    try {
      const response = await axios.patch(
        `https://chobarcart-api.onrender.com/api/v1/products/product/${product._id}`,
        data
      )
      toast({
        title: "Success",
        description: response.data.message,
      })
      fetchProductDetails()
      setIsUpdatingProduct(false)
    } catch (error) {
      setIsUpdatingProduct(false)
      toast({
        title: "Error",
        description: "Error while updating the product please try again later",
        variant: "destructive",
      })
    }
  }

  const deleteProduct = async () => {
    setIsDeletingProduct(true)
    try {
      const response = await axios.delete(
        `https://chobarcart-api.onrender.com/api/v1/products/product/${product._id}`
      )
      toast({
        title: "Success",
        description: response.data.message,
      })
      navigate(`/${userData.username}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting the product please try again later",
        variant: "destructive",
      })
    } finally {
      setIsDeletingProduct(false)
    }
  }

  const handleToggleLike = async () => {
    if(!authStatus){
      navigate('/sign-in')
      return
    }
    setIsLiked(true)
    setLikeCount(likeCount + 1)
    try {
      const response = await axios.post(`https://chobarcart-api.onrender.com/api/v1/likes/product/${productId}`)
      setLikeId(response.data.data._id)
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while liking the product",
      })
    }
  }

  const handleUntoggleLike = async () => {
    setIsLiked(false)
    setLikeCount(likeCount - 1)
    try {
      const response = await axios.delete(`https://chobarcart-api.onrender.com/api/v1/likes/delete-product-like/${likeId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while unliking the product",
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
      <div className="relative">
        {userData?._id === product.owner?._id && (
          <div className="absolute right-0 md:right-10 lg:right-24">
            <Dialog>
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <LucideMoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DialogTrigger asChild>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit2 className="mr-1 w-5" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger>
                      <DropdownMenuItem className="cursor-pointer">
                        <Trash2 className="mr-1 w-5" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deleteProduct}
                      disabled={isDeletingProduct}
                    >
                      {isDeletingProduct ? (
                        <div className="flex items-center">
                          <Loader2 className="animate-spin mr-2" />
                          <span>Deleting</span>
                        </div>
                      ) : (
                        <>Continue</>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                      Please fill out the detail you want to change
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(updateProduct)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="edit-title"
                          defaultValue={product.title}
                          className="col-span-3"
                          maxLength="100"
                          {...register("title", {
                            required: "Please enter a title",
                            maxLength: {
                              value: 100,
                              message:
                                "Title should be less than 100 characters",
                            },
                          })}
                        />
                        {errors.title && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.title.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="edit-description"
                          defaultValue={product.description}
                          className="col-span-3"
                          maxLength="500"
                          {...register("description", {
                            required: "Please enter a description",
                            maxLength: {
                              value: 500,
                              message:
                                "Description should be less than 500 characters",
                            },
                          })}
                        />
                        {errors.description && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="edit-price"
                          defaultValue={product.price}
                          className="col-span-3"
                          type="number"
                          {...register("price", {
                            required: "Please enter a price",
                          })}
                        />
                        {errors.price && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Gender
                        </Label>
                        <select
                          id="gender"
                          defaultValue={product.gender}
                          {...register("gender")}
                          className="dark:bg-dark dark:text-light p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value=" ">All can use</option>
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                          <option value="boys">Boys</option>
                          <option value="girls">Girls</option>
                          <option value="kids">Kids</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isUpdatingProduct}>
                        {isUpdatingProduct ? (
                          <div className="flex items-center">
                            <Loader2 className="animate-spin mr-2" />
                            <span>Saving</span>
                          </div>
                        ) : (
                          <>Save Changes</>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </AlertDialog>
            </Dialog>
          </div>
        )}
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
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-3 pl-6 cursor-pointer"
                onClick={() => {
                  navigate(`/${product.owner?.username}`)
                }}
              >
                <img
                  src={product.owner?.avatar || "/images/default-user.png"}
                  alt=""
                  className="rounded-full h-10 w-10 md:w-12 md:h-12 object-cover"
                />
                <h3 className="font-semibold text-xl">
                  {product.owner?.username}
                </h3>
              </div>
              <div className="mr-7">
                {isLiked ? (
                  <div className="flex items-center gap-2">
                    <span>{likeCount}</span>
                    <ThumbsUp fill="#0e48bd" color="#0e48bd" className="cursor-pointer w-5 h-5" onClick={handleUntoggleLike}/>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{likeCount}</span>
                    <ThumbsUp color="#0e48bd" onClick={handleToggleLike} className="cursor-pointer w-5 h-5"/>
                  </div>
                )}
              </div>
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
            onClick={authStatus ? submitComment : () => navigate("/sign-in")}
            disabled={isSubmittingComment}
          >
            {isSubmittingComment ? (
              <div className="flex ">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 ">
                    <img
                      src={comment.owner?.avatar || "/images/default-user.png"}
                      alt="user-avatar"
                      className="rounded-full h-10 w-10 md:w-12 md:h-12 cursor-pointer object-cover"
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
                  <div className="edit">
                    {userData._id === comment.owner?._id && (
                      <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <LucideMoreVertical />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                <Edit2 className="mr-1 w-5" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => deleteComment(comment._id)}
                            >
                              <Trash2 className="mr-1 w-5" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Comment</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Comment
                              </Label>
                              <Input
                                id="edit-comment"
                                defaultValue={comment.content}
                                className="col-span-3"
                                ref={editCommentInput}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => updateComment(comment._id)}
                              type="button"
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
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
