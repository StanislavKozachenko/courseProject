import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchPartTransactions = createAsyncThunk(
  'book/fetchPartTransactionsStatus',
  async (params, thunkAPI) => {
    const { userId } = params;
    const { data } = await axios.get(`http://localhost:8080/transactions/?userId=${userId}`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Транзакций нет');
    }

    return thunkAPI.fulfillWithValue(data);
  },
);
export const fetchTransactions = createAsyncThunk(
  'author/fetchTransactionsStatus',
  async (params, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:8080/transactions/all`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Транзакций нет');
    }
    return thunkAPI.fulfillWithValue(data);
  },
);
const initialState = {
  transactions: [],
  transactionsStatus: 'loading',
};

const transactionsSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setItems(state, action) {
      state.transactions = action.payload;
    },
  },
  extraReducers: {
    [fetchTransactions.pending]: (state) => {
      state.transactionsStatus = 'loading';
      state.transactions = [];
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.transactionsStatus = 'success';
      state.transactions = action.payload;
    },
    [fetchTransactions.error]: (state) => {
      state.transactionsStatus = 'error';
      state.transactions = [];
    },
    [fetchPartTransactions.pending]: (state) => {
      state.transactionsStatus = 'loading';
      state.transactions = [];
    },
    [fetchPartTransactions.fulfilled]: (state, action) => {
      state.transactionsStatus = 'success';
      state.transactions = action.payload;
    },
    [fetchPartTransactions.error]: (state) => {
      state.transactionsStatus = 'error';
      state.transactions = [];
    },
  },
});

export const { setItems } = transactionsSlice.actions;

export default transactionsSlice.reducer;
