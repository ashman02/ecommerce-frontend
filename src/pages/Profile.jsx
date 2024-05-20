import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Container } from "@/components"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { Separator } from "@/components/ui/separator"

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState({})
  const { username } = useParams()
  const { toast } = useToast()

  const currentUser = useSelector((state) => state.auth.data)

  const getUser = async () => {
    setIsLoading(false)
    try {
      const response = await axios.get(`/api/v1/users/get-account/${username}`)
      setUser(response.data.data[0])
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

  useEffect(() => {
    getUser()
  }, [username])


  //you can use optimistic ui here (i will later)
  const handleUnfollow = async () => {
    try {
      const response = await axios.delete(`/api/v1/subscriptions/subscribe/${user._id}`)
      toast({
        title : "Success",
        description : "Unfollowed the account successfully"
      })
    } catch (error) {
      toast({
        title : "Error",
        description : "Error while unfollowing the user"
      })
    }
  }
  const handleFollow = async () => {
    try {
      const response = await axios.post(`/api/v1/subscriptions/subscribe/${user._id}`)
      toast({
        title : "Success",
        description : response.data.message
      })
    } catch (error) {
      toast({
        title : "Error",
        description : "Error while following the user"
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
              <span>{user.subscriberCount}</span>
              <span>Followers</span>
            </div>
            <div className="following flex flex-col gap-[1px] items-center justify-center">
              <span>{user.subscribedToCount}</span>
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
            <Button variant="ghost" className="px-10 ">
              Edit Profile
            </Button>
          ) : user.isSubscribed ? (
            <Button onClick={handleUnfollow} variant="destructive" className="px-10 ">
              Unfollow
            </Button>
          ) : (
            <Button onClick={handleFollow} className="px-10 bg-blue-700 text-white hover:bg-blue-400">
              Follow
            </Button>
          )}
        </div>

        <Separator />
        <div className="fourthTeir Posts">
          {/* get the post of the user */}
        </div>
      </div>
    </Container>
  )
}

export default Profile
