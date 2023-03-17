import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import books from './slices/booksSlice';
import users from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    books,
    users,
  },
});
