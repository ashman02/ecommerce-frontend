import React from "react"
import { useNavigate } from "react-router-dom"
import { X } from "lucide-react"

const CartCard = ({ title, img, price, id, ownerUsername, ownerImg, handleOnCrossClick }) => {
  const navigate = useNavigate()

  return (
    <div className="dark:bg-secDark bg-secLight w-[45%] md:w-[30%] lg:w-[18%] h-1/3 cursor-pointer rounded-sm shadow-sm">
      <div className="md:h-56 h-32 overflow-hidden rounded-t-sm relative">
        <img
          onClick={() => navigate(`/productdetail/${id}`)}
          src={img}
          alt=""
        />
        <span onClick={handleOnCrossClick} className="absolute top-1 right-1 bg-secLight rounded-full text-black">
          <X />
        </span>
      </div>

      {ownerImg && (
        <div
          onClick={() => {
            navigate(`/${ownerUsername}`)
          }}
          className="flex gap-2 items-center pt-1 px-2"
        >
          <img className="w-8 h-8 rounded-full" src={ownerImg} alt="" />
          <h3 className="font-semibold">{ownerUsername}</h3>
        </div>
      )}

      <div className="text py-3 px-2">
        <h3 className="md:text-lg font-semibold min-h-14 max-h-14 overflow-hidden leading-4">
          {title}
        </h3>
        <div>{price}$</div>
      </div>
    </div>
  )
}

export default CartCard
