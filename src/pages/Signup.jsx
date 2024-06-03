import React, { useEffect, useState } from "react"
import { signUpSchema } from "../schemas/sign-up.js"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
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
import { useToast } from "@/components/ui/use-toast"
import axiosInstance from "axiosConfig.js"

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)

  const debounced = useDebounceCallback(setUsername, 500)
  const { toast } = useToast()
  //checking username
  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        setIsCheckingUsername(true)
        try {
          const response = await axiosInstance.get(
            `users/check-username/${username}`
          )
          setUsernameMessage(response.data?.message)
          setIsCheckingUsername(false)
        } catch (error) {
          setUsernameMessage("Username is taken")
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
    setIsSubmitting(true)
    dispatch(setSignUp(data))
    try {
      const response = await axiosInstance.post("users/test-email", {
        email: data.email,
        username: data.username,
      })
      dispatch(setVerify(response.data?.data))
      toast({
        title: "Verification Code",
        description: response.data?.message,
      })
      navigate("/verify")
    } catch (error) {
      toast({
        title: "Email",
        description: "this email is already registered",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[98%] md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-5 mt-24">
      <div className="text-center">
        <h1 className="font-bold text-xl md:text-3xl">
          Welcome to Chobar Cart
        </h1>
        <p className="md:text-lg">The whole new word of products</p>
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
          <span
            className={`pt-4  ${
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
                  <Loader2 className="animate-spin" /> Submitting
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex justify-center items-center mt-8">
        <div className="text-center bg-white dark:bg-[#020817] p-4 rounded-lg shadow-md">
          <p className="text-black dark:text-gray-300">
            Already have an account?
          </p>
          <Link
            to="/log-in"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 font-semibold"
          >
            Log in
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            If you already have an account, click the button above to log in.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
