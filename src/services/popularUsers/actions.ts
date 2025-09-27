// src\services\popularUsers\actions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { getPopularUsersApi } from '@api/Api';
import { TResponseUsers } from '@api/types';
import { FETCH_POPULAR_USERS } from '@const/thunk-types';

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

export const getPopularUsersThunk = createAsyncThunk<
  TResponseUsers,
  number,
  { state: RootState }
>(
  FETCH_POPULAR_USERS,
  async (page, { getState }) => {
    const currentUsersCount = getState().popularUsers.users.length;
    const expectedMinIndex = (page - 1) * USERS_PAGE_SIZE;

    if (currentUsersCount > expectedMinIndex) {
      return { users: [], hasMore: true };
    }

    const response = await getPopularUsersApi(page);
    return response;
  }
);
