import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    totalPrice: 0,
    items: [],
    totalCount: 0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addProduct(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) {
                findItem.quantity += 1;
                state.totalPrice += findItem.price;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });

                state.totalPrice += action.payload.price;
            }
            state.totalCount += 1;
        },
        minusProduct(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) {
                findItem.quantity -= 1;
                state.totalPrice -= findItem.price;
                state.totalCount -= 1;
            }

        },
        removeAddedProduct(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearItems(state) {
            state.items = [];
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart(state) {
            state.totalPrice = 0;
            state.totalCount = 0;
            state.items = [];
        }


    }
});
export const { addProduct, removeAddedProduct, clearItems, minusProduct, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;