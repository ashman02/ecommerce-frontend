import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button, ProductCard, Loader, Container } from "../components"
import axios from "axios"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Value } from "@radix-ui/react-select"
import { Separator } from "@/components/ui/separator"

const Search = () => {
  const query = useSelector((state) => state.input.value)
  const [isLoading, setIsLoading] = useState(false)
  const [limit, setLimit] = useState(30)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("price")
  const [sortType, setSortType] = useState("asc")
  const [gender, setGender] = useState("")
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    if (query.length) {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `/api/v1/products/get-products?query=${query}&limit=${limit}&page=${page}&sortBy=${sortBy}&sortType=${sortType}&gender=${gender}`
        )
        setProducts(response.data.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getProducts()
  }, [query, sortBy, sortType, limit, page, gender])

  const handleSortChange = (event) => {
    const value = event.target.value
    if (value === "newest") {
      setSortBy("createdAt")
      setSortType("asc")
    } else if (value === "low") {
      setSortBy("price")
      setSortType("asc")
    } else {
      setSortBy("price")
      setSortType("desc")
    }
  }


  return (
    <>
      <Container>
        <div className="flex gap-5 items-start">
          <div className="w-1/3">
            <div>
              <h2>Sort By</h2>
              <RadioGroup defaultValue="low">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="newest"
                    id="option-one"
                    onClick={handleSortChange}
                  />
                  <Label htmlFor="option-one">Newest first</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="low"
                    id="option-two"
                    onClick={handleSortChange}
                  />
                  <Label htmlFor="option-two">Price-Low to High</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="high"
                    id="option-two"
                    onClick={handleSortChange}
                  />
                  <Label htmlFor="option-three">Price-High to Low</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {
            isLoading ? (
              <>
              <div className="flex items-center justify-center">
                <Loader />
              </div>
              </>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                title={product.title}
                img={product.image[0]}
                price={product.price}
                id={product._id}
                ownerUsername={product.owner?.username}
                ownerImg={product.owner?.avatar}
              />
            ))}
          </div>
            )
          }
          
        </div>
      </Container>
    </>
  )
}

export default Search
