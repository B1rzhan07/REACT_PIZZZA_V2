import { configureStore } from '@reduxjs/toolkit'
import filter from '../redux/Slices/filterSlice'
import cart from '../redux/Slices/cartSlice'
import pizzas from '../redux/Slices/pizzasSlice'
export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizzas,
    },
})