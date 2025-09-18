// src\services\users\actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../../api/Api";

export const getUsersThunk = createAsyncThunk(
  'user/fetchAll',
  async () => {
    const response = await getUsersApi();
    return response.users;
  }
);