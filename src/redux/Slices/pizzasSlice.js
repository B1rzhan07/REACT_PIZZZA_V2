import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async({
            search,
            currentPage,
            categoryId,
            sort,
        }, thunkAPI) => {

            const { data } = await axios.get(
                    `https://63241a5cbb2321cba924b436.mockapi.io/data?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sort.replace("-", "")}&order=${
          sort.includes("-") ? "asc" : "desc"
        } ${search}`
      );
    return data;
});
const initialState = {
    items: [],
}
const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
        },
    },
});
export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;