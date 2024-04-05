import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.escuelajs.co/api/v1/"
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "products?offset=0&limit=10",
        }),
        getProductDetail : builder.query({
            query: (id) => `products/${id}`
        })
    })
})

export const { useGetAllProductsQuery, useGetProductDetailQuery } = productApi