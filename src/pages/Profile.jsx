import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Container, Loader } from "@/components"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from "react-redux"
import { login } from "@/redux/features/auth/authSlice"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Edit3, Loader2 } from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [isError, setIsError] = useState(false)
  const [userProducts, setUserProducts] = useState([])

  //edit profile
  const [isUpdatingUser, setIsUpdatingUser] = useState(false)
  const [updatedUsername, setUpdatedUsername] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isUpdatingPic, setIsUpdatingPic] = useState(false)
  const pic = useRef()

  const [user, setUser] = useState({})
  const { username } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const debounced = useDebounceCallback(setUpdatedUsername, 500)

  //optimistic ui states for follow and unfollow
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)

  const currentUser = useSelector((state) => state.auth.data)

  const getUser = async () => {
    setIsLoading(false)
    try {
      const response = await axios.get(`/api/v1/users/get-account/${username}`)
      setUser(response.data.data[0])
      getUserProducts(response.data.data[0]._id)

      //optimistic ui
      setIsFollowing(response.data.data[0].isSubscribed)
      setFollowerCount(response.data.data[0].subscriberCount)
      setFollowingCount(response.data.data[0].subscribedToCount)

      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while fetching user details",
        variant: "destructive",
      })
      setIsError(true)
      setIsLoading(false)
    }
  }

  const getUserProducts = async (userId) => {
    setIsLoadingProducts(true)
    try {
      const response = await axios.get(
        `/api/v1/products/get-products?userId=${userId}`
      )
      setUserProducts(response.data.data)
    } catch (error) {
    } finally {
      setIsLoadingProducts(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [username])

  //to check username
  useEffect(() => {
    const checkUsername = async () => {
      if (updatedUsername) {
        if (updatedUsername === user.username) {
          setUsernameMessage("")
        } else {
          setIsCheckingUsername(true)
          try {
            const response = await axios.get(
              `/api/v1/users/check-username/${updatedUsername}`
            )
            setUsernameMessage(response.data?.message)
            setIsCheckingUsername(false)
          } catch (error) {
            setUsernameMessage("Username is taken")
            setIsCheckingUsername(false)
          }
        }
      }
    }

    checkUsername()
  }, [updatedUsername])

  //you can use optimistic ui here (i will later)
  const handleUnfollow = async () => {
    try {
      setFollowerCount(followerCount - 1)
      setIsFollowing(false)
      const response = await axios.delete(
        `/api/v1/subscriptions/subscribe/${user._id}`
      )
      toast({
        title: "Success",
        description: "Unfollowed the account successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while unfollowing the user",
      })
    }
  }

  const handleFollow = async () => {
    try {
      setFollowerCount(followerCount + 1)
      setIsFollowing(true)
      const response = await axios.post(
        `/api/v1/subscriptions/subscribe/${user._id}`
      )
      toast({
        title: "Success",
        description: response.data.message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while following the user",
      })
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const updateUser = async (data) => {
    setIsUpdatingUser(true)
    try {
      const response = await axios.patch(`/api/v1/users/update-account`, data)
      navigate(`/${response.data.data.username}`)
      toast({
        title: "Success",
        description: response.data.message,
      })
      dispatch(login(response.data.data))
      getUser()
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while updating user",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingUser(false)
    }
  }

  const updateProfilePic = async () => {
    if (pic.current.files[0]) {
      setIsUpdatingPic(true)
      const formData = new FormData()
      formData.append("avatar", pic.current.files[0])

      try {
        const response = await axios.patch(`/api/v1/users/update-avatar`, formData)
        toast({
          title: "Success",
          description: response.data.message,
        })
        dispatch(login(response.data.data))
        pic.current.value = ""
        getUser()
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while updating profile picture",
          variant: "destructive",
        })
      } finally {
        setIsUpdatingPic(false)
      }
    }

  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>User not found </div>
  }

  return (
    <Container>
      <div className="flex flex-col gap-3">
        <div className="first-tier flex gap-5">
          {/* profile pic */}
          <Dialog>
            <div className="flex">
              <img
                src={user.avatar || "images/default-user.png"}
                alt="profile pic"
                className="rounded-full relative w-24 h-24 object-cover"
              />
              {currentUser?._id === user._id && (
                <DialogTrigger asChild>
                  <span className="absolute left-24 lg:left-28 cursor-pointer">
                    <Edit3 className="w-4" />
                  </span>
                </DialogTrigger>
              )}
            </div>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile picture</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profile-pic" className="text-right">
                    Picture
                  </Label>
                  <Input
                    type="file"
                    id="profile-pic"
                    defaultValue=""
                    className="col-span-3"
                    ref={pic}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={updateProfilePic} disabled={isUpdatingPic}>
                  {isUpdatingPic ? (
                    <div className="flex items-center">
                      <Loader2 className="animate-spin mr-2" />
                      <span>Saving</span>
                    </div>
                  ) : (
                    <>Save Changes</>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* follower count */}
          <div className="followers flex items-center gap-4">
            <div className="follow flex flex-col gap-[1px] items-center justify-center">
              <span>{followerCount}</span>
              <span>Followers</span>
            </div>
            <div className="following flex flex-col gap-[1px] items-center justify-center">
              <span>{followingCount}</span>
              <span>Following</span>
            </div>
          </div>
        </div>
        {/* bio and other user details */}
        <div className="tiertwo">
          <div className="name font-bold">{user.fullName}</div>
          <div className="font-semibold">{user.location || "no location added by user"}</div>
          <div className="bio ">
            {user.bio || "no bio added by user"}
          </div>
        </div>
        <Dialog>
          <div className="tierThree">
            {currentUser?._id === user._id ? (
              <DialogTrigger asChild>
                <Button variant="outline" className="px-10 ">
                  Edit Profile
                </Button>
              </DialogTrigger>
            ) : isFollowing ? (
              <Button
                onClick={handleUnfollow}
                variant="destructive"
                className="px-10 "
              >
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={handleFollow}
                className="px-10 bg-blue-700 text-white hover:bg-blue-400"
              >
                Follow
              </Button>
            )}
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(updateUser)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    defaultValue={user.fullName}
                    className="col-span-3"
                    {...register("fullName", {
                      required: "Please enter Full Name",
                    })}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-500 w-max">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue={user.username}
                    className="col-span-3"
                    {...register("username", {
                      required: "Please enter username",
                      maxLength: {
                        value: 16,
                        message: "Username should be less than 16 characters",
                      },
                      minLength: {
                        value: 3,
                        message: "Username should be more than 3 characters",
                      },
                    })}
                    onChange={(e) => debounced(e.target.value)}
                  />
                  <span
                    className={`pt-4 w-max  ${
                      usernameMessage === "Username is available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {isCheckingUsername ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      usernameMessage
                    )}
                  </span>
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-500 w-max">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Loction
                  </Label>
                  <Input
                    id="location"
                    defaultValue={user.location || ""}
                    className="col-span-3"
                    placeholder="city,district,state"
                    {...register("location")}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    defaultValue={user.bio || ""}
                    className="col-span-3"
                    {...register("bio", {
                      maxLength: {
                        value: 300,
                        message: "Bio should be less than 300 characters",
                      },
                    })}
                  />
                  {errors.bio && (
                    <p className="mt-2 text-sm text-red-500 w-max">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isUpdatingUser}>
                  {isUpdatingUser ? (
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
        </Dialog>

        <Separator />
        {/* User products */}
        {isLoadingProducts ? (
          <>
            <Loader />
          </>
        ) : userProducts.length === 0 ? (
          <div className="font-bold md:text-3xl flex items-center justify-center">
            No Products
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-wrap">
            {userProducts.map((product) => (
              <ProductCard
                key={product._id}
                title={product.title}
                img={product.image[0]}
                price={product.price}
                id={product._id}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default Profile
