import React from 'react'
import { Container, ProductCard, Loader } from "../components"
import { useParams } from 'react-router-dom'
import { useGetProductsByCategoryQuery } from '../redux/services/productApi'



const ProductsByCategory = () => {

  const { category, categoryId } = useParams()
  const { data, isLoading, error } = useGetProductsByCategoryQuery(categoryId)

  if (error) {
    return <div className='flex justify-center items-center my-32'>
      <h1 className='font-bold text-slate-400 text-xl md:text-3xl text-center'>404! Category not found</h1>
    </div>
  }

  if (isLoading) {
    return <div className='flex justify-center items-center my-32'>
      <Loader />
    </div>
  }

  return (
    <>
      <Container>
        <div className='flex gap-5 flex-wrap items-center justify-center'>
          {data.length === 0 ? (
            <h1 className='font-bold text-slate-400 text-center text-xl md:text-3xl'>Sorry to say but currently no products are available under this category</h1>
          ) : (
            data.map(item => (
              <ProductCard key={item.id} title={item.title} id={item.id} img={item.images[0].replace(/[^a-zA-Z0-9\/\.\:]/g, '')} price={item.price} />
            ))
          )}
        </div>
      </Container>
    </>
  )
}

export default ProductsByCategory
