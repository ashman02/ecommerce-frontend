import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.escuelajs.co/api/v1/"
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (limit=10) => `products?offset=0&limit=${limit}`,
        }),
        getProductDetail : builder.query({
            query: (id) => `products/${id}`
        }),
        getProductsByCategory : builder.query({
            query : (categoryId) => `categories/${categoryId}/products`
        }),
        getCategories : builder.query({
            query : () => `categories`
        })
    })
})

export const { useGetAllProductsQuery, useGetProductDetailQuery, useGetProductsByCategoryQuery, useGetCategoriesQuery } = productApi