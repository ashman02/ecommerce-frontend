import React from "react"
import { Container } from "../components"

const About = () => {
  return (
    <Container>
      <div className="min-h-screen p-0 md:p-6">
        <div className="max-w-7xl mx-auto p-8 rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-8">
            About Our Website
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Major Functionalities
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Account creation for users.</li>
              <li>
                Upload products with images, titles, descriptions, and other
                details.
              </li>
              <li>Follow other users to stay updated with their uploads.</li>
              <li>
                Search for products with various filters like category and
                gender.
              </li>
              <li>
                Sort products by newest first, price low to high, and other
                options.
              </li>
              <li>
                Search products by category to find exactly what you're looking
                for.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Why Our Website is Useful
            </h2>
            <p>
              Our website is designed to help you find products near you. By
              searching for products nearby, you can compare prices and
              availability in your local area. This feature helps you make
              informed decisions and find the best deals without traveling far.
              Additionally, our platform allows you to connect with other users,
              expanding your network and staying updated with new products as
              they are uploaded.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
            <p>
              Join our community today by creating an account and start
              uploading your products. Explore the various features and make the
              most out of our platform to buy, sell, and connect with others.
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}

export default About
