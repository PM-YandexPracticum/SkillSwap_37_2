// src\services\user\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByID, getUserLikesApi } from '../../api/Api';
import { TUser } from '../../api/types';
import { FETCH_USER_BY_ID, FETCH_USER_LIKES, LOGOUT_USER } from "@const/thunk-types";
import { setLogout } from "./user-slice";

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

//выход из профиля
export const logoutThunk = createAsyncThunk(
  LOGOUT_USER,
  async (_, { dispatch }) => {
    dispatch(setLogout());
  }
);