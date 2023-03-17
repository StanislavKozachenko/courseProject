import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('user/fetchUsersStatus', async (params, thunkAPI) => {
  const { data } = await axios.get(`https://63d554b90e7ae91a00ac4e8e.mockapi.io/users`);
  if (data.length === 0) {
    return thunkAPI.rejectWithValue('Пользователей нет');
  }
  return thunkAPI.fulfillWithValue(data);
});

const initialState = {
  items: [],
  status: 'loading',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchUsers.error]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = userSlice.actions;

export default userSlice.reducer;
