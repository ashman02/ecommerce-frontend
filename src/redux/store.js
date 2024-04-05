import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./services/productApi";
import inputReducer from "./features/input/inputSlice";
import cartReducer from "./features/cart/cartSlice";


export const store = configureStore({
    reducer: {
        [productApi.reducerPath] : productApi.reducer,
        input : inputReducer,
        cart : cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)
})