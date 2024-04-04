import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : ""
}

export const inputSlice = createSlice({
    name : "input",
    initialState,
    reducers: {
        setInput : (state, action) => {
            state.value  = action.payload
        }
    }
})

export const {setInput} = inputSlice.actions

export default inputSlice.reducer