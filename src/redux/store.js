import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./features/input/inputSlice";
import signupReducer from "./features/signup/signupSlice";
import verifyReducer from "./features/verficationcode/verifySlice";
import authReducer from "./features/auth/authSlice";


export const store = configureStore({
    reducer: {
        input : inputReducer,
        signup : signupReducer,
        verify : verifyReducer,
        auth : authReducer
    },
})