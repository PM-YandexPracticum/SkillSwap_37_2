// src\services\user\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByID } from '../../api/Api';
import { TUser } from '../../api/types';

export const getUserThunk = createAsyncThunk<TUser | null, number>(
  'user/fetchById',
  async (userId: number) => {
    const user = await getUserByID(userId);
    return user;
  }
);