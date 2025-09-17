// src\services\users\users-slice.ts

import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../api/types';
import { getUsersThunk } from './actions';

type UsersState = {
  users: TUser[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsersThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователей';
      });
  }
});

export const usersReducer = usersSlice.reducer;
