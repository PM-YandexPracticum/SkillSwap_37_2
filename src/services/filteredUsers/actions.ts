// src\services\filteredUsers\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import store, { RootState } from "@store";
import { TGetFilteredUsersArgs, TResponseUsers } from "@api/types";
import { FETCH_USERS_FILTERED } from "@const/thunk-types";
import { getFilteredUsersApi } from "@api/Api";
import { resetFilteredUsers } from "./filtered-users-slice";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

export const getFilteredUsersThunk = createAsyncThunk<
  TResponseUsers,
  TGetFilteredUsersArgs,
  { state: RootState }
>(
  FETCH_USERS_FILTERED,
  async ({ page, gender, places, skillType, subcategories, text_for_search }, { getState }) => {
    const state = getState().filteredUsers;
    const usersCount = state.users.length;
    const expectedMinIndex = (page - 1) * USERS_PAGE_SIZE;

    if (usersCount > expectedMinIndex) {
      return { users: [], hasMore: true };
    }
    
    return getFilteredUsersApi({
      page,
      gender,
      places,
      skillType,
      subcategories,
      text_for_search,
    });
  }
);

export const reloadFilteredUsers = (page = 1) => {
  const state = store.getState();
  const { gender, places, skillType, subcategories, text_for_search } = state.filters;

  store.dispatch(resetFilteredUsers());
  store.dispatch(getFilteredUsersThunk({
    page: page,
    gender,
    places,
    skillType,
    subcategories,
    text_for_search
  }));
};
