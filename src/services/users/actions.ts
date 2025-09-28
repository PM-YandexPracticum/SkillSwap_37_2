// src\services\users\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { FETCH_ALL_USERS } from "@const/thunk-types";
import { getUsersApi } from "@api/Api";
import { TResponseUsers, TUser } from "@api/types";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

export const getUsersThunk = createAsyncThunk<
  TResponseUsers,  
  number,           // аргумент (page)
  { state: RootState }
>(
  FETCH_ALL_USERS,
  async (page, { getState }) => {
    // количество в списке пользователей
    const state = getState().users;
    const usersCount = state.users.length;
    const expectedMinIndex = (page - 1) * USERS_PAGE_SIZE;

    // если уже загружено больше, чем нужно - возвращаем пустоту
    if (usersCount > expectedMinIndex) {
      return { users: [], hasMore: true };
    }

    const response = await getUsersApi(page);
    return response;
  }
);