import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./services/productApi";
import inputReducer from "./features/input/inputSlice";
import cartReducer from "./features/cart/cartSlice";
import signupReducer from "./features/signup/signupSlice";
import verifyReducer from "./features/verficationcode/verifySlice";


export const store = configureStore({
    reducer: {
        [productApi.reducerPath] : productApi.reducer,
        input : inputReducer,
        cart : cartReducer,
        signup : signupReducer,
        verify : verifyReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)
})