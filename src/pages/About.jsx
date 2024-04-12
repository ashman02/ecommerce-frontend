import React from 'react'
import {Container, Button} from "../components"

const About = () => {
  return (
    <>
    <Container>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">About Our Website</h1>
      <div className="flex flex-col md:flex-row justify-center mb-8">
        <div className="md:w-1/2 md:mr-4 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <p className="text-gray-700">
            Our website offers a seamless shopping experience where You can easily add items to your cart, search for products by category, or use our efficient search engine to find exactly what you're looking for by name.
          </p>
          <img src="https://i.imgur.com/QkIa5tT.jpeg" alt="Products" className="mt-4 rounded-md shadow-md w-64" />
        </div>
        <div className="md:w-1/2 md:ml-4">
          <h2 className="text-xl font-semibold mb-2">Technologies Used</h2>
          <ul className="text-gray-700">
            <li>React Redux for state management and API calls handling</li>
            <li>React Router DOM for smooth navigation</li>
            <li>Tailwind CSS for sleek and responsive design</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Technologies" className="mt-4 rounded-md shadow-md w-96" />
        </div>
      </div>
      <div className="text-lg text-gray-700">
        <p>
          Our website is more than just an online store; it's a gateway to a world of possibilities. With a user-friendly interface and a vast array of products, shopping has never been easier. Whether you're searching for the latest fashion trends, tech gadgets, or home essentials, we've got you covered.
        </p>
        <p className="mt-4">
          Powered by cutting-edge technologies like React Redux and React Router DOM, our website ensures a seamless browsing experience. Say goodbye to long loading times and clunky interfaces – we've optimized every aspect to provide you with lightning-fast performance and intuitive navigation.
        </p>
        <p className="mt-4">
          So why wait? Start exploring our website today and discover a world of endless possibilities. Shop with confidence, knowing that we're committed to delivering the highest quality products and unparalleled customer service. Welcome to the future of online shopping – welcome to our website.
        </p>
      </div>
    </div>
    <div className='text-center'>
      <Button bg='bg-slate-900'>Contact Me</Button>
    </div>
    </Container>
    </>
  )
}

export default About
