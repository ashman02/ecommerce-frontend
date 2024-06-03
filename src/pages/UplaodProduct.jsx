import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { Loader2, UploadIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import axiosInstance from "axiosConfig"

const UplaodProduct = () => {
  const [categories, setCategories] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const { toast } = useToast()
  const navigate = useNavigate()

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get("category/get-categories")
      setCategories(response.data.data)
    } catch (error) {}
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleCategoryClick = (categoryId) => {
    let updatedCategories;
    if (selectedCategories.includes(categoryId)) {
      updatedCategories = selectedCategories.filter((id) => id !== categoryId)
    } else {
      if (selectedCategories.length < 3) {
        updatedCategories = [...selectedCategories, categoryId]
      } else {
        return
      }
    }
    setSelectedCategories(updatedCategories)
    setValue("categories", updatedCategories) // Update the form value
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    //contruct the data
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("gender", data.gender)
    formData.append("category", JSON.stringify(data.categories))
    for (let i = 0; i < data.productImages.length; i++) {
      formData.append("productImages", data.productImages[i])
    }

    try {
      const response = await axiosInstance.post(
        "products/create-product",
        formData
      )
      toast({
        title: "Success",
        description: response.data.message,
      })
      navigate("/")
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[98%] md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-5 mt-24">
      <div className="text-center">
        <h1 className="font-bold text-xl md:text-3xl">Upload Your Product</h1>
        <p className="md:text-lg">Fill out all the details of the product</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="md:text-xl">
            Title
          </Label>
          <Input
            defaultValue=""
            {...register("title", {
              required: "Please enter a title",
              maxLength: {
                value: 100,
                message: "Title should be less than 100 characters",
              },
            })}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="descirption" className="md:text-xl">
            Description
          </Label>
          <Input
            defaultValue=""
            {...register("description", {
              required: "Please enter a description",
              maxLength: {
                value: 500,
                message: "Description should be less than 500 characters",
              },
            })}
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="price" className="md:text-xl">
            Price
          </Label>
          <Input
            type="number"
            defaultValue=""
            {...register("price", { required: "Please enter a price" })}
          />
          {errors.price && (
            <p className="mt-2 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="categories flex flex-col gap-1 ">
          <Label htmlFor="categories" className="md:text-xl">
            Categories
          </Label>
          <div
            className="flex flex-col gap-1 dark:bg-dark bg-white p-2 rounded-lg custom-scrollbar"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
          >
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className={`cursor-pointer p-2 rounded-lg ${selectedCategories.includes(category._id) ? "bg-blue-500 text-white" : "bg-secLight dark:bg-secDark text-black dark:text-white"}`}
              >
                {category.title}
              </div>
            ))}
          </div>
          {errors.categories && (
            <p className="mt-2 text-sm text-red-500">
              {errors.categories.message}
            </p>
          )}
          <input
            type="hidden"
            {...register("categories", {
              required: "Please select at least one category",
              validate: (value) =>
                value.length <= 3 || "Please select no more than 3 categories",
            })}
            value={selectedCategories.join(",")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="gender" className="md:text-xl">
            Gender
          </Label>
          <select
            id="gender"
            {...register("gender")}
            className="dark:bg-dark dark:text-light p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value=" ">All can use</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="productImages" className="md:text-xl">
            Image
          </Label>
          <Input
            type="file"
            multiple
            {...register("productImages", {
              required: "Please upload minimum three images of your product",
              validate: (files) => {
                if (files.length < 3) {
                  return "Please select at least 3 images"
                }
                if (files.length > 6) {
                  return "Please select no more than 6 images"
                }
                return true
              },
            })}
            className="dark:bg-dark dark:text-light p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.productImages && (
            <p className="mt-2 text-sm text-red-500">
              {errors.productImages.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Uploading
            </>
          ) : (
            <>
              <UploadIcon className="mr-1 w-5" /> Upload
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

export default UplaodProduct
