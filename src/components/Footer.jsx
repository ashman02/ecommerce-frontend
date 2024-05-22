import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="mt-44">
            <footer className="bg-gray-900 text-gray-300 relative -bottom-36 z-40">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/3 mb-4 md:mb-0 text-center">
                            <h3 className="text-xl font-semibold mb-2">chobarCart </h3>
                            <p className="text-sm">Discover an immersive online shopping experience with our cutting-edge e-commerce platform, offering a vast array of products, seamless navigation, and unparalleled customer service.</p>
                        </div>
                        <div className="md:w-1/3 mb-4 md:mb-0 text-center">
                            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                            <ul className="text-sm">
                                <li><Link to="/" className="hover:text-gray-500">Home</Link></li>
                                <li><Link to="/allcategories" className="hover:text-gray-500">Category</Link></li>
                                <li><Link to="/about" className="hover:text-gray-500">About Us</Link></li>
                                <li><Link to="/cart" className="hover:text-gray-500">Cart</Link></li>
                            </ul>
                        </div>
                        <div className="md:w-1/3 text-center">
                            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                            <p className="text-sm">123 Street Name, Sri Ganganagar, India</p>
                            <p className="text-sm">Phone: +1234567890</p>
                            <p className="text-sm">Email: sidhuashman02@gmail.com</p>
                        </div>
                    </div>
                    <hr className="my-8 border-gray-700" />
                    <div className="text-center text-sm">
                        <p>&copy; 2024 chobarCart. All rights reserved.</p>
                        <p>Designed with <span role="img" aria-label="Love">❤️</span> by cforChobar</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
