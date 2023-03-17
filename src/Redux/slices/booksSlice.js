import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('book/fetchBooksStatus', async (params, thunkAPI) => {
  const { currentPage, categoryId, sortType, search } = params;
  const { data } = await axios.get(
    `https://63d554b90e7ae91a00ac4e8e.mockapi.io/items?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortType.sort}&order=desc${search}`,
  );
  if (data.length === 0) {
    return thunkAPI.rejectWithValue('Книг нет');
  }
  return thunkAPI.fulfillWithValue(data);
});

const initialState = {
  items: [],
  status: 'loading',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchBooks.error]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = bookSlice.actions;

export default bookSlice.reducer;
