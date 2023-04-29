import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import books from './slices/booksSlice';
import users from './slices/usersSlice';
import authors from './slices/authorsSlice';
import publishers from './slices/publishersSlice';
import transactions from './slices/transactionsSlice';
import orders from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    books,
    users,
    authors,
    publishers,
    transactions,
    orders,
  },
});
