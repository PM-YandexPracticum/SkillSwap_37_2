// src\services\user\user-slice.ts
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../api/types';
import { getUserThunk } from './actions';

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,   // это тот, кто сейчас залогинился
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user
  },
  extraReducers: builder => {
    builder
    .addCase(getUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
    })
    .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователя';
    });
  }
});

export const { getUser } = userSlice.selectors;

export const userReducer = userSlice.reducer;

