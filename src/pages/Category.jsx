import React, { useEffect, useState, lazy, Suspense } from "react"
import { Container, Loader } from "../components"
import axios from "axios"
const CategoryCard = lazy(() => import("../components/CategoryCard"))
import { Skeleton } from "@/components/ui/skeleton"
import axiosInstance from "axiosConfig"

const Category = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("category/get-categories")
      setCategories(response.data.data)
      setIsError(false)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (isError) {
    return (
      <div className="flex justify-center items-center my-32">
        <h1 className="font-bold text-xl md:text-3xl text-center">
          404! Categories not found
        </h1>
      </div>
    )
  }

  return (
    <Container>
      <div className="flex flex-wrap gap-5 mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <Loader />
          </div>
        ) : (
          categories.map((item) => (
            <Suspense
              fallback={
                <div className="flex flex-col items-center space-y-3">
                  <Skeleton className="md:h-60 h-44 lg:w-64 md:w-52 w-40 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 lg:w-64 md:w-52 w-40" />
                  </div>
                </div>
              }
            >
              <CategoryCard
                key={item._id}
                title={item.title}
                id={item._id}
                img={item.image}
              />
            </Suspense>
          ))
        )}
      </div>
    </Container>
  )
}

export default Category
