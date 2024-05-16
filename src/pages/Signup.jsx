import React, { useEffect, useState } from "react"
import { signUpSchema } from "../schemas/sign-up.js"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSignUp } from "../redux/features/signup/signupSlice.js"
import { setVerify } from "../redux/features/verficationcode/verifySlice.js"
import axios from "axios"
import { useDebounceCallback } from "usehooks-ts"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Loader2 } from "lucide-react"

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)

  const debounced = useDebounceCallback(setUsername, 500)

  //checking username
  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        setIsCheckingUsername(true)
        try {
          const response = await axios.get(
            `/api/v1/users/check-username/${username}`
          )
          setIsCheckingUsername(false)
          console.log(response.data)
        } catch (error) {
          console.log("error while checking username", error.response.data)
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsername()
  }, [username])

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    console.log(data)
    setIsSubmitting(true)
    dispatch(setSignUp(data))
    try {
      const response = await axios.post("/api/v1/users/test-email", {
        email: data.email,
        username: data.username,
      })
      console.log(response)
      dispatch(setVerify(response.data))
      navigate("/verify")
    } catch (error) {
      console.log("Error while seding verification code", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[98%] md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-5 mt-24">
      <div className="dark:text-white text-center">
        <h1 className="font-bold text-xl md:text-3xl">
          Welcome to Chobar Cart
        </h1>
        <p className="md:text-lg">Unleash the power of a comman man</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      debounced(e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 /> "Submitting
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Signup
