// src\services\users\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { FETCH_ALL_USERS, FETCH_USER_BY_ID } from "@const/thunk-types";
import { getUserByID, getUsersApi } from "@api/Api";
import { TUser } from "@api/types";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

// запрашиваем страницу с данными
export const getUsersThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getUsersApi>>,   // тип успешного ответа
  number,                           // аргумент (page)
  { state: RootState }              // вот тут мы описываем тип состояния
>(
  FETCH_ALL_USERS,
  async (page, { getState }) => {
    const currentUsersCount = getState().users.users.length;
    const expectedMinIndex = (page - 1) * USERS_PAGE_SIZE;

    // если уже загружено больше, чем нужно - возвращаем пустоту
    if (currentUsersCount > expectedMinIndex) {
      return { users: [], hasMore: true };
    }

    const response = await getUsersApi(page);
    return response;
  }
);