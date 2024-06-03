import React, { useState } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/schemas/sign-in"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux"
import { login } from "@/redux/features/auth/authSlice"
import axiosInstance from "axiosConfig"

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await axiosInstance.post("users/login", data)
      dispatch(login(response.data?.data))
      console.log(response.data.data)
      toast({
        title: "Success",
        description: response.data?.message,
      })
      navigate("/")
      setIsSubmitting(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "password and identifier is not matching",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[98%] md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-5 mt-24">
      <div className="dark:text-white text-center">
        <h1 className="font-bold text-xl md:text-3xl">Sign in</h1>
        <p className="md:text-lg">Log in to your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input placeholder="username or email" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" /> Logging in
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex justify-center items-center mt-8">
        <div className="text-center bg-white dark:bg-[#020817] p-4 rounded-lg shadow-md">
          <p className="text-black dark:text-gray-300">New to chobarCart?</p>
          <Link
            to="/sign-up"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 font-semibold"
          >
            Sign up
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            If you don't have an existing account click above to create one.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
