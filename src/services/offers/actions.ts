import { getNotificationsApi, getOffersApi } from "@api/Api";
import { FETCH_OFFERS } from "@const/thunk-types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOffersThunk = createAsyncThunk(
  FETCH_OFFERS,
  async () => {
    const data = await getOffersApi();
    return data.offers;
  }
);

export const addOfferThunk = createAsyncThunk(
  FETCH_OFFERS,
  async (userId) => {
    
  }
);