// src\services\user\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByID, getUserLikesApi } from '../../api/Api';
import { TUser } from '../../api/types';
import { FETCH_USER_BY_ID, FETCH_USER_LIKES } from "@const/thunk-types";

export const getUserThunk = createAsyncThunk<TUser | null, number>(
  FETCH_USER_BY_ID,
  async (userId: number) => {
    const user = await getUserByID(userId);
    return user;
  }
);


// грузим список лайков авторизованного пользователя
export const getUserLikesThunk = createAsyncThunk(
  FETCH_USER_LIKES,
  async (userId: number) => {
    // 
    const likes = await getUserLikesApi(userId);
    // оставляем только id пользователей, которых лайкнул текущий юзер
    return likes.map((like: any) => like.liked_id);
  }
);