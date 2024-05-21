import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Container, Loader } from "@/components"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components"

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [isError, setIsError] = useState(false)
  const [userProducts, setUserProducts] = useState([])
  const [user, setUser] = useState({})
  const { username } = useParams()
  const { toast } = useToast()

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

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Something went wrong</div>
  }

  return (
    <Container>
      <div className="flex flex-col gap-3">
        <div className="first-tier flex gap-5">
          <img
            width={100}
            src={user.avatar || "images/default-user.png"}
            alt="profile pic"
            className="rounded-full"
          />
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
        <div className="tiertwo">
          <div className="name font-bold">{user.fullName}</div>
          <div className="bio ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
            ducimus cumque fugit quas fugiat saepe velit minus tempore porro non
            architecto obcaecati reiciendis rem, cum distinctio, labore
            provident veniam molestiae a doloribus eius excepturi facilis!
            Laudantium animi nam sit praesentium similique, enim sunt rerum,
            sequi autem quae totam, earum ut.
          </div>
        </div>
        <div className="tierThree">
          {currentUser?._id === user._id ? (
            <Button variant="outline" className="px-10 ">
              Edit Profile
            </Button>
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

        <Separator />
        {
          isLoadingProducts ? (
            <>
            <Loader/>
            </>
          ) : (
            userProducts.length === 0 ? (
              <div className="font-bold md:text-3xl flex items-center justify-center">No Products</div>
            ) : (
              <div className="flex items-center gap-3 flex-wrap">
                {
                  userProducts.map((product) => (
                    <ProductCard key={product._id} title={product.title} img={product.image[0]} price={product.price} id={product._id}/>
                  ))
                }
              </div>
            )
          )
        }
      </div>
    </Container>
  )
}

export default Profile
