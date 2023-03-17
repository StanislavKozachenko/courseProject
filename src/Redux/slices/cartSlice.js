import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  totalPrice: 0,
  items: [],
};
const calculateTotalPrice = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) findItem.count++;
      else state.items.push({ ...action.payload, count: 1 });
      calculateTotalPrice(state);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      calculateTotalPrice(state);
    },
    removeCartItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        calculateTotalPrice(state);
      }
    },
    clearItems(state) {
      state.items = [];
      calculateTotalPrice(state);
    },
  },
});

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, clearItems, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
