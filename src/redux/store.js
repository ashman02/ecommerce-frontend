import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./services/productApi";
import inputReducer from "./features/input/inputSlice";


export const store = configureStore({
    reducer: {
        [productApi.reducerPath] : productApi.reducer,
        input : inputReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)
})