import {z} from "zod"

export const signUpSchema = z.object({
    fullName : z.string().trim(),
    username : z.string().min(3, { message: "Must be 3 or more characters long" }).max(16, { message: "Must be 16 or fewer characters long" }),
    email : z.string().email({ message: "Invalid email address" }),
    password : z.string().min(8).max(25)
})