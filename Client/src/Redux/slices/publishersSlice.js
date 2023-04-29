import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPublishers = createAsyncThunk(
  'publisher/fetchPublishersStatus',
  async (params, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:8080/publishers/all`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Издательств нет');
    }
    return thunkAPI.fulfillWithValue(data);
  },
);

const initialState = {
  publishers: [],
  publishersStatus: 'loading',
};

const authorsSlice = createSlice({
  name: 'publisher',
  initialState,
  reducers: {
    setItems(state, action) {
      state.publishers = action.payload;
    },
  },
  extraReducers: {
    [fetchPublishers.pending]: (state) => {
      state.publishersStatus = 'loading';
      state.publishers = [];
    },
    [fetchPublishers.fulfilled]: (state, action) => {
      state.publishersStatus = 'success';
      state.publishers = action.payload;
    },
    [fetchPublishers.error]: (state) => {
      state.publishersStatus = 'error';
      state.publishers = [];
    },
  },
});

export const { setItems } = authorsSlice.actions;

export default authorsSlice.reducer;
