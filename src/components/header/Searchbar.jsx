import React from 'react'
import { Container, Logo } from "../index"
import { Link } from 'react-router-dom'

const Searchbar = () => {

    return (
        <>
            <header>
                <Container>
                    <div className='Upper flex justify-between items-center'>
                        <div className='logo'>
                            <Link to="/">
                                <Logo />
                            </Link>
                        </div>
                        <div className='search w-3/4 md:w-1/2 flex items-center'>
                            <input
                            type='text' placeholder='Search'
                            className='bg-gray-300 text-lg px-2 py-1 rounded-md w-full focus:outline-none' />
                            <img src="/images/search.png" alt=""
                             width={20} 
                             className='-ml-7' />
                        </div>
                    </div>
                    <div className='h-[1px] bg-gray-500 my-3 opacity-20'></div>
                </Container>
            </header>
        </>
    )
}

export default Searchbar
