// src\services\user\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByID } from '../../api/Api';
import { TUser } from '../../api/types';
import { FETCH_USER_BY_ID } from "@const/thunk-types";

export const getUserThunk = createAsyncThunk<TUser | null, number>(
  FETCH_USER_BY_ID,
  async (userId: number) => {
    const user = await getUserByID(userId);
    return user;
  }
);