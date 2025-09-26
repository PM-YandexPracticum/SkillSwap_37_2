// src\services\users\users-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsersThunk, pickUserOfferThunk } from './actions';
import { TUser } from '@api/types';

type UsersState = {
  userOffer: TUser | null;
  users: TUser[];
  isLoading: boolean;
  error: string | null;
  page: number; // страница для пагинации
  hasMore: boolean;
};

const initialState: UsersState = {
  userOffer: null,
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
  selectors: {
    getUserOffer: (state) => state.userOffer
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        // проверка на уникальность id
        // первая страница грузится 2 раза,
        // если это убрать будут первая и вторая страница дублироваться
        // если подумать, это очень слабое место
        // так как одна новая карточка может перелистнуть целую страницу
        if (action.payload.users.length > 0) {
          const existingIds = new Set(state.users.map(u => u.id));
          const newUsers = action.payload.users.filter(u => !existingIds.has(u.id));

          if (newUsers.length > 0) {
            state.users = [...state.users, ...newUsers];
            state.page += 1;
          }
        }
        state.hasMore = action.payload.hasMore; 
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователей';
      })
      .addCase(pickUserOfferThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(pickUserOfferThunk.fulfilled, (state, action) => {
        state.userOffer = action.payload;
        state.isLoading = false;
      })
      .addCase(pickUserOfferThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выбора пользователя';
      });
  }
});

export const { getUserOffer } = usersSlice.selectors;
export const { setPage, setHasMore, resetUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
