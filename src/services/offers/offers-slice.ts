// src\services\user\user-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOffer } from '../../api/types';
import { addOfferThunk, getOffersThunk } from './actions';

export interface OffersState {
  offers: TOffer[];
  isOfferCreated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  offers: [],
  isOfferCreated: false,
  isLoading: false,
  error: null
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setIsOfferCreated: (state, action: PayloadAction<boolean>) => {
      state.isOfferCreated = action.payload;
      console.log(`state.isOfferCreated ${state.isOfferCreated}`);
      
  }
  },
  selectors: {
    getOffers: (state) => state.offers,
    getIsOfferCreated: (state) => state.isOfferCreated
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
        state.error = action.error.message || 'Ошибка загрузки предложений';
    })
    .addCase(addOfferThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
    })

    .addCase(addOfferThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers.push(action.payload);
        state.isOfferCreated = true;
    })
    .addCase(addOfferThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка создания предложения';
    })

  }
});

export const { getOffers, getIsOfferCreated } = offersSlice.selectors;
export const { setIsOfferCreated } = offersSlice.actions;

export const offersReducer = offersSlice.reducer;

