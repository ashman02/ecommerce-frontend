import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },
        checkItem: (state, action) => {
            state.cart.map(item => {
                if (item.id === action.payload) {
                    item.selected = !item.selected
                }
            })
        },
        increaseQuantity: (state, action) => {
            state.cart.map(item => {
                if (item.id === action.payload) {
                    if (item.quantity <= 10) {
                        item.quantity = item.quantity + 1
                    }

                }
            })
        },
        decreaseQuantity: (state, action) => {
            state.cart.map(item => {
                if (item.id === action.payload) {
                    if (item.quantity > 1) {
                        item.quantity = item.quantity - 1
                    }

                }
            })
        },
    }
})

export const { addToCart, removeFromCart, checkItem, increaseQuantity, decreaseQuantity } = cartSlice.actions

export default cartSlice.reducer