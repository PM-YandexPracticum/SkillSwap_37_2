// src\services\users\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../../api/Api";
import { RootState } from "@store";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

export const getUsersThunk = createAsyncThunk(
 "user/fetchAll",
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