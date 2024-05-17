import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : ''
}

export const signUpSlice = createSlice({
    name : "signUp",
    initialState,
    reducers: {
        setSignUp : (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setSignUp} = signUpSlice.actions

export default signUpSlice.reducer