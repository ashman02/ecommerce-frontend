import React from "react"
import { useNavigate } from "react-router-dom"

const HomeCategory = ({id, title, img}) => {
  const navigate = useNavigate()
  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer min-w-[4.5rem]"
      onClick={() => navigate(`/category/${title}/${id}`)}
    >
      <img
        src={img}
        alt={title}
        className="rounded-full h-12 w-12 md:w-16 md:h-16"
      />
      <h3 className="md:text-lg max-w-20 max-h-7 overflow-clip">
        {title}
      </h3>
    </div>
  )
}

export default HomeCategory
