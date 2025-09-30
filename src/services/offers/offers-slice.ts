// src\services\user\user-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TResponseNotifications, TNotificationEvent, TOffer } from '../../api/types';
import { getOffersThunk } from './actions';
// import {  } from './actions';

export interface OffersState {
  offers: TOffer[] | [];
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  error: null
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
  },

  selectors: {
    getOffers: (state) => state.offers
  },
  extraReducers: builder => {
    builder
    .addCase(getOffersThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
    })

    .addCase(getOffersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
    })
    .addCase(getOffersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователя';
    })

  }
});

export const { getOffers } = offersSlice.selectors;
export const {  } = offersSlice.actions;

export const offersReducer = offersSlice.reducer;

