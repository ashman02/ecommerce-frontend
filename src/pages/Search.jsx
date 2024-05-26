import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button, ProductCard, Loader, Container } from "../components"
import axios from "axios"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const Search = () => {
  const query = useSelector((state) => state.input.value)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
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
        setIsError(false)
      } catch (error) {
        setIsError(true)
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

  const handleGenderChange = (value) => {
    setGender(value)
  }

  return (
    <>
      <Container>
        <div className="flex gap-5 items-start min-h-svh flex-col md:flex-row">
          <div className="md:w-1/3 ">
            <div>
              <h2>Sort By</h2>
              <RadioGroup defaultValue="low" className="flex md:flex-col  ">
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
            {products[0]?.gender && (
              <div className="gender pt-5">
                <Select onValueChange={handleGenderChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="boys">Boys</SelectItem>
                    <SelectItem value="girls">Girls</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                    <SelectItem value=" ">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {isLoading ? (
              <>
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              </>
            ) : isError ? (
              <div className="text-center md:text-2xl text-xl font-bold">
                No Product Found
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
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
            )}
            <div className={`${products.length < 30 ? "hidden" : ""}`}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={() => setPage(page - 1)} />
                  </PaginationItem>
                  <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={() => setPage(page + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Search
