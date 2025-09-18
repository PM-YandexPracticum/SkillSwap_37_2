// src\services\users\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../../api/Api";
import { TUser } from "../../api/types";


export const getUsersThunk = createAsyncThunk(
  'user/fetchAll',
  async (page: number) => { 
    const response = await getUsersApi();
    const limit = 20;
    const startIndex = (page - 1) * limit; 
    const endIndex = startIndex + limit;
    const paginatedUsers = response.users.slice(startIndex, endIndex); 
    
    return paginatedUsers;
  }
);
// загрузка следующей страницы 
export const loadMoreUsers = createAsyncThunk(
  'users/loadMore',
  async (page: number, { dispatch }) => {
    dispatch(getUsersThunk(page));
  }
);