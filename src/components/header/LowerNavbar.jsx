import React from 'react'
import { Container } from "../index"
import { NavLink } from 'react-router-dom'

const LowerNavbar = () => {

    const navItems = [
        {
            name: 'Home',
            slug: '/'
        },
        {
            name: 'Category',
            slug: '/category'
        },
        {
            name: 'Cart',
            slug: '/cart'
        },
        {
            name: 'About',
            slug: '/about'
        },
    ]

    return (
        <Container>
            <nav>
                <ul className='flex gap-4 justify-center items-center'>
                    {navItems.map(item => (
                        <li key={item.name} >
                            <NavLink to={item.slug}
                                className={({ isActive }) => `md:text-lg font-semibold ${isActive? "border-solid border-b-2 border-gray-400":""} pb-1`} >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </Container>
    )
}

export default LowerNavbar
