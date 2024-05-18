import { verifyCodeSchema } from "@/schemas/verificationCode"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Verify = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const userData = useSelector((state) => state.signup.value)
  const verifyCode = useSelector((state) => state.verify.value)

  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      otp: "",
    },
  })

  //on Submit
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    if (data.otp == verifyCode) {
      try {
        const response = await axios.post("/api/v1/users/register", userData)
        toast({
          title: "Success",
          description: response.data?.message,
        })
        navigate("/sign-in")
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while registering user, Please try again",
          variant: "destructive",
        })
      }
      finally {
        setIsSubmitting(false)
      }
    } else {
      toast({
        title: "Verification Code Error",
        description: "Please enter valid verification code",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pl-4 flex flex-col items-center justify-center mt-44">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Verifying
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Verify
