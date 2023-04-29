import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthors = createAsyncThunk(
  'author/fetchAuthorsStatus',
  async (params, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:8080/authors/all`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Авторов нет');
    }
    return thunkAPI.fulfillWithValue(data);
  },
);
const initialState = {
  authors: [],
  authorsStatus: 'loading',
};

const authorsSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setItems(state, action) {
      state.authors = action.payload;
    },
  },
  extraReducers: {
    [fetchAuthors.pending]: (state) => {
      state.authorsStatus = 'loading';
      state.authors = [];
    },
    [fetchAuthors.fulfilled]: (state, action) => {
      state.authorsStatus = 'success';
      state.authors = action.payload;
    },
    [fetchAuthors.error]: (state) => {
      state.authorsStatus = 'error';
      state.authors = [];
    },
  },
});

export const { setItems } = authorsSlice.actions;

export default authorsSlice.reducer;
