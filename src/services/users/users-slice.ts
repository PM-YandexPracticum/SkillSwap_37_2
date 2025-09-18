// src\services\users\users-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../api/types';
import { getUsersThunk } from './actions';

type UsersState = {
  users: TUser[];
  isLoading: boolean;
  error: string | null;
  page: number; // страница для пагинации
  hasMore: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  page: 0,
  hasMore: true 
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
     // установка текущей страницы
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    // установка флага наличия данных
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    // сброс состояния к начальному
    resetUsers: (state) => {
      state.users = [];
      state.page = 0;
      state.hasMore = true;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.users.length > 0) {
        state.users = [...state.users, ...action.payload.users];
        state.page += 1;
        }
        state.hasMore = action.payload.hasMore; 
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователей';
      });
  }
});

export const { setPage, setHasMore, resetUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
