import React from 'react'
import { Category as CategoryComponent, Container, Loader } from "../components"
import {useGetCategoriesQuery} from "../redux/services/productApi"



const Category = () => {


  const {data, isLoading, error} = useGetCategoriesQuery()

  if (error) {
    return <div className='flex justify-center items-center my-32'>
      <h1 className='font-bold text-slate-400 text-xl md:text-3xl text-center'>404! Categories not found</h1>
    </div>
  }

  return (
    <Container>
      <div className='flex flex-wrap justify-center gap-5 mt-10'>
       {isLoading ? (
        <Loader/>
       ) : (
        data.map(item => (
          <CategoryComponent key={item.id} title={item.name} id={item.id} img={item.image}/>
        ))
       )}
      </div >
    </Container>
  )
}

export default Category
