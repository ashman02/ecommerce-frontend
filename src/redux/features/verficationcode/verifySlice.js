import { createSlice } from "@reduxjs/toolkit";
import { number } from "zod";

const initialState = {
    value : ''
}

export const verifySlice = createSlice({
    name : "verify",
    initialState,
    reducers: {
        setVerify : (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setVerify} = verifySlice.actions
export default verifySlice.reducer