import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchPartOrders = createAsyncThunk(
  'book/fetchPartOrdersStatus',
  async (params, thunkAPI) => {
    const { userId } = params;
    const { data } = await axios.get(`http://localhost:8080/orders/?userId=${userId}`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Заказов нет');
    }

    return thunkAPI.fulfillWithValue(data);
  },
);
export const fetchOrders = createAsyncThunk(
  'author/fetchOrdersStatus',
  async (params, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:8080/orders/all`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Заказов нет');
    }
    return thunkAPI.fulfillWithValue(data);
  },
);
const initialState = {
  orders: [],
  ordersStatus: 'loading',
};

const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setItems(state, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.ordersStatus = 'loading';
      state.orders = [];
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.ordersStatus = 'success';
      state.orders = action.payload;
    },
    [fetchOrders.error]: (state) => {
      state.ordersStatus = 'error';
      state.orders = [];
    },
    [fetchPartOrders.pending]: (state) => {
      state.ordersStatus = 'loading';
      state.orders = [];
    },
    [fetchPartOrders.fulfilled]: (state, action) => {
      state.ordersStatus = 'success';
      state.orders = action.payload;
    },
    [fetchPartOrders.error]: (state) => {
      state.ordersStatus = 'error';
      state.orders = [];
    },
  },
});

export const { setItems } = ordersSlice.actions;

export default ordersSlice.reducer;
