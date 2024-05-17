import {z} from "zod"

export const signUpSchema = z.object({
    username : z.string().min(3, { message: "Must be 3 or more characters long" }).max(16, { message: "Must be 16 or fewer characters long" }),
    fullName : z.string().trim(),
    email : z.string().email({ message: "Invalid email address" }),
    password : z.string().min(8, { message: "Password must contain 8 characters" }).max(25, { message: "Password should be less than 25 characters" })
})