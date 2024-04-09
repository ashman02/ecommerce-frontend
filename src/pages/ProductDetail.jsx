import React, { useEffect, useState } from 'react'
import { Button, Container, Loader } from '../components'
import { useParams } from 'react-router-dom'
import { useGetProductDetailQuery } from "../redux/services/productApi"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../redux/features/cart/cartSlice"
import { useNavigate } from 'react-router-dom'



const ProductDetail = () => {

  const { productId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetProductDetailQuery(productId)
  const cartItems = useSelector(state => state.cart.cart)  

  const [imgIndex, setImgIndex] = useState(0)
  const [isInCart, setIsInCart] = useState(false)
  const dispatch = useDispatch()

  // if(data){
  //   console.log(data.images[imgIndex].replaceAll(/[\[\]&]+/g, '').replaceAll('"', ''))
  // }


  useEffect(() => {
    if(cartItems.length > 0 && data){
      let item = cartItems.find(item => item.id === data.id)
      if(item) setIsInCart(true)
    }
  }, [cartItems])

  const handleLeftslide = () => {
    if (imgIndex !== 0) {
      setImgIndex(imgIndex - 1)
    }
  }
  const handleRightslide = () => {
    setImgIndex(imgIndex + 1)
  }

  
  if (isLoading) {
    return <div className='flex justify-center items-center my-24'>
      <Loader />
    </div>
  }

  if (error) {
    return <div className='flex justify-center items-center my-32'>
      <h1 className='font-bold text-slate-400 text-xl md:text-3xl'>Oops! It seems like something went wrong. Please try again later.</h1>
    </div>
  }

  return (
    <Container>
      <section className='lg:flex justify-center gap-20 my-12 '>
        <div className='imagediv md:w-96 w-64 mx-auto lg:mx-0'>
          <img className='md:w-96 w-64 ' src={data.images[imgIndex]} alt=""
          />
          <div className="buttons relative z-10 flex justify-between md:translate-y-[-13rem] translate-y-[-9rem]">
            <button disabled={imgIndex === 0} onClick={handleLeftslide} className='bg-[#d1d5dbc2] rounded-full'>
              <img src="/images/left-arrow.svg" alt="" className='md:w-12 w-8' />
            </button>
            <button disabled={imgIndex === 2} onClick={handleRightslide} className='bg-[#d1d5dbc2] rounded-full'>
              <img src="/images/right-arrow.svg" alt="" className='md:w-12 w-8' />
            </button>
          </div>

        </div>
        <div className="detail lg:w-1/3 lg:mt-0 text-center lg:text-start">
          <div className="title">
            <h1 className='md:text-3xl text-lg font-bold'>{data.title}</h1>
            <h1 className='md:text-3xl text-lg'>{data.price}$</h1>
          </div>
          <div className='desc mt-3 mb-3 lg:min-h-48'>
            <p>{data.description}</p>
          </div>

          {!isInCart && <div className='mt-8'>
            <Button paddingX='md:px-[120px] px-[50px]' 
            handleClick={() => { 
              dispatch(addToCart(
                {
                  id : data.id,
                  title : data.title,
                  price : data.price,
                  image : data.images[0],
                  quantity : 1,
                  selected : true,
                }
              ))
          }}
             >Add to Cart</Button>
          </div>}

          {isInCart && <div className='mt-8'>
            <Button bg={"bg-slate-900"} paddingX='md:px-[120px] px-[50px]' 
            handleClick={() => { navigate('/cart')  }}
             >Go to Cart</Button>
          </div>}

        </div>
      </section>
    </Container>
  )
}

export default ProductDetail
