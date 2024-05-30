import React, { useEffect, useState } from 'react'
import { Category as CategoryComponent, Container, Loader } from "../components"
import axios from 'axios'




const Category = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/v1/category/get-categories")
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
    return <div className='flex justify-center items-center my-32'>
      <h1 className='font-bold text-xl md:text-3xl text-center'>404! Categories not found</h1>
    </div>
  }

  return (
    <Container>
      <div className='flex flex-wrap gap-5 mt-10'>
       {isLoading ? (
        <div className='flex justify-center items-center w-full'>
          <Loader/>
        </div>
       ) : (
        categories.map(item => (
          <CategoryComponent key={item._id} title={item.title} id={item._id} img={item.image} />
        ))
       )}
      </div >
    </Container>
  )
}

export default Category
