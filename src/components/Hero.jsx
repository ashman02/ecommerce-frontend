import React from 'react'
import { Container } from "./index"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <Container>
      <section className='hero lg:flex gap-5'>
        <Link to="/category/clothes/1">
          <div className='main-div w-full lg:w-[70vw] flex items-center justify-evenly bg-slate-300'>
            <div className='main-text pl-4 flex flex-col items-center'>
              <h4 className=''>New Arrivals</h4>
              <h2 className='md:text-4xl -mt-2'>Men's Clothing</h2>
              <h3 className='font-bold'>Upto 70% Off</h3>
            </div>
            <img src="/images/tshirtblack.png" alt=""
              className='md:w-96 w-40' />
          </div>
        </Link>

        <div className='secondry div w-[30vw] hidden lg:flex flex-col gap-5'>
          <Link to="/category/shoes/4">
            <div className=' bg-gray-300 flex items-center justify-evenly px-3 h-[182px]'>
              <div className="sec-text flex flex-col">
                <h2 className='font-semibold text-2xl'>Classic</h2>
                <h2 className='font-semibold text-2xl'>Summer Shoes</h2>
                <h2 className=' text-xl'>Upto 60% Discount</h2>
              </div>
              <img src="/images/boot.png" alt=""
                className='w-36' />
            </div>
          </Link>

          <Link to="/category/electronics/2">
            <div className=' bg-gray-300 flex items-center justify-evenly px-3 h-[182px]'>
              <div className="sec-text flex flex-col">
                <h2 className='font-semibold text-2xl'>Upto 40% Off</h2>
                <h2 className='text-2xl'>On Electronics</h2>
              </div>
              <img src="/images/elec.png" alt=""
                className='w-36' />
            </div>
          </Link>

         
        </div>
      </section>
    </Container>
  )
}

export default Hero
