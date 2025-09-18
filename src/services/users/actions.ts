// src\services\users\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersPaginatedApi } from "../../api/Api";
import { TUser } from "../../api/types";
import { PAGE_SIZE } from "../../shared/constants/pagination";
import { RootState } from "../../services/store";

export const getUsersThunk = createAsyncThunk(
  "user/fetchAll",
  async (page: number, { getState }) => {
    const state = getState() as RootState;
    const currentUsersCount = state.users.users.length;

    const expectedMinIndex = (page - 1) * PAGE_SIZE;
    if (currentUsersCount > expectedMinIndex) {
      return { users: [], hasMore: true };
    }

    const response = await getUsersPaginatedApi(page);
    return response;
  }
);
