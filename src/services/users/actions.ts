// src\services\users\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { FETCH_ALL_USERS } from "@const/thunk-types";
import { getUsersApi } from "@api/Api";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

export const getUsersThunk = createAsyncThunk(
  FETCH_ALL_USERS,
  async (page: number, { getState }) => {
    const state = getState() as RootState;
    const currentUsersCount = state.users.users.length;

    const expectedMinIndex = (page - 1) * USERS_PAGE_SIZE;

    if (currentUsersCount > expectedMinIndex) {
      return { users: [], hasMore: true };
    }

    const response = await getUsersApi(page);
    return response;
  }
);