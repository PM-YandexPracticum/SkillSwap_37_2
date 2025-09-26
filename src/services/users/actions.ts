// src\services\users\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { FETCH_ALL_USERS, FETCH_USER_BY_ID } from "@const/thunk-types";
import { getUserByID, getUsersApi } from "@api/Api";
import { TUser } from "@api/types";

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

export const pickUserOfferThunk = createAsyncThunk<TUser | null,number>(
  FETCH_USER_BY_ID,
  async (userId: number) => {
    const user = await getUserByID(userId);
    return user;
  })