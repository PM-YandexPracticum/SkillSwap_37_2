// src\services\user\user-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../api/types';
import { getUserLikesThunk, getUserThunk } from './actions';

export interface UserState {
  user: TUser | null;
  likes: number[]; // id пользователей, которых лайкнул авторизованный юзер
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,   // это тот, кто сейчас залогинился
  likes: [],
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      // state.isAuthChecked = true; // чтобы выглядело как "залогинен"
    },
    setLogout: (state) => {
      state.user = null;
      state.likes = [];
      state.isAuthChecked = false;
      state.error = null;
    }
  },

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
    })
    .addCase(getUserLikesThunk.pending, state => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getUserLikesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.likes = action.payload; 
    })
    .addCase(getUserLikesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Ошибка загрузки лайков';
    })
  }
});

// старые имена (используются сейчас в проекте)
export const { getUser } = userSlice.selectors;
export const { setUser } = userSlice.actions;

// новые имена (рекомендуется использовать дальше)
export const { getUser: getCurrentUser } = userSlice.selectors;
export const { setUser: setCurrentUser, setLogout } = userSlice.actions;

export const userReducer = userSlice.reducer;

