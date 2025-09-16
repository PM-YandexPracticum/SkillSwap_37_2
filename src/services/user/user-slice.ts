// src\services\user\user-slice.ts
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../api/types';
import { getUserThunk } from './actions';

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,   // это тот, кто сейчас залогинился
  isAuthChecked: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(getUserThunk.pending, state => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
    })
    .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
    });
  }
});

export const userReducer = userSlice.reducer;

