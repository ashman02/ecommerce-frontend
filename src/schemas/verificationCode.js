import { z } from "zod"

export const verifyCodeSchema = z.object({
  otp: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})
