// src\services\filteredUsers\actions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { TGetFilteredUsersArgs, TResponseUsers } from '@api/types';
import { FETCH_USERS_FILTERED } from '@const/thunk-types';
import { getFilteredUsersApi } from '@api/Api';

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

export const getFilteredUsersThunk = createAsyncThunk<
  TResponseUsers,      // что вернём
  TGetFilteredUsersArgs,       // что передаём в thunk (page + gender)
  { state: RootState } // доступ к getState
>(
  FETCH_USERS_FILTERED,
    async ({ page, gender, places }, { getState }) => {
        // количество в списке отфильтрованных пользователей
        const state = getState().filteredUsers;
        const usersCount = state.users.length;
        const expectedMinIndex = (page - 1) * USERS_PAGE_SIZE;

        if (usersCount > expectedMinIndex) {
          return { users: [], hasMore: true };
        }

        const response = await getFilteredUsersApi({page, gender, places});
        return response;
  }
);