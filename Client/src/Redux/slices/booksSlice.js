import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('book/fetchBooksStatus', async (params, thunkAPI) => {
  const { currentPage, categoryId, sortType, search } = params;
  const { data } = await axios.get(
    // `https://63d554b90e7ae91a00ac4e8e.mockapi.io/items?page=${currentPage}&limit=4&${
    //   categoryId > 0 ? `category=${categoryId}` : ''
    // }&sortBy=${sortType.sort}&order=desc${search}`,
    `http://localhost:8080/books/?category=${categoryId}&page=${currentPage}${search}&sortBy=${sortType.sort}`,
  );
  if (data.length === 0) {
    return thunkAPI.rejectWithValue('Книг нет');
  }

  return thunkAPI.fulfillWithValue(data);
});
export const fetchAllBooks = createAsyncThunk(
  'book/fetchAllBooksStatus',
  async (params, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:8080/books/all`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Книг нет');
    }

    return thunkAPI.fulfillWithValue(data);
  },
);
const initialState = {
  books: [],
  booksStatus: 'loading',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setItems(state, action) {
      state.books = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.booksStatus = 'loading';
      state.books = [];
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.booksStatus = 'success';
      state.books = action.payload;
    },
    [fetchBooks.error]: (state) => {
      state.booksStatus = 'error';
      state.books = [];
    },
    [fetchAllBooks.pending]: (state) => {
      state.booksStatus = 'loading';
      state.books = [];
    },
    [fetchAllBooks.fulfilled]: (state, action) => {
      state.booksStatus = 'success';
      state.books = action.payload;
    },
    [fetchAllBooks.error]: (state) => {
      state.booksStatus = 'error';
      state.books = [];
    },
  },
});

export const { setItems } = bookSlice.actions;

export default bookSlice.reducer;
