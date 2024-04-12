import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useGetAllProductsQuery } from '../redux/services/productApi'
import { Button, ProductCard, Loader } from "../components"

const Search = () => {

  const [limit, setLimit] = useState(10)
  const input = useSelector(state => state.input.value)
  const { data, isLoading, error } = useGetAllProductsQuery(limit)
  const [results, setResults] = useState([])


  useEffect(() => {
    if (data) {
      const result = data.filter((item) => {
        return (
          item.title.toLowerCase().includes(input.toLowerCase()) ||
          item.description.toLowerCase().includes(input.toLowerCase())
        )
      })
      setResults(result)
    }
  }, [data, input])


  const handleLimit = () => {
    setLimit(limit + 10)
  }

  if(isLoading){
    return <div className='flex justify-center py-20'>
      <Loader/>
    </div>
  }

  return (
    <>
    <div className='flex flex-wrap gap-5 items-center justify-center duration-300 ease-in-out '>
      {results.length === 0 ? (
        <div className='flex items-center justify-center mt-24'>
          <h1 className='text-xl md:text-3xl font-bold text-slate-400'>Product Not Found</h1>
          {/* later work fetch some products from api encourage user to buy those. */}
        </div>
      ) : (
        results.map(item => (
          <ProductCard key={item.id} title={item.title} id={item.id} img={item.images[0].replace(/[^a-zA-Z0-9\/\.\:]/g, '')} price={item.price} />
        ))
      )}
    </div>
    {results.length > 0 && <div className='text-center py-5'>
      <Button 
      handleClick={handleLimit}
      disabled={results.length === 0 || limit > results.length}
      classes='disabled:bg-slate-100'
       >Show More</Button>
    </div>}
    </>
  )
}

export default Search
