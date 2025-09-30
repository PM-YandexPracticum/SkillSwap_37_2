import { getNotificationsApi } from "@api/Api";
import { FETCH_NOTIFICATIONS_ALL } from "@const/thunk-types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getNotificationThunk = createAsyncThunk(
  FETCH_NOTIFICATIONS_ALL,
  async(userId: number) => {
    const notifications = await getNotificationsApi(userId)
    return notifications
  }
)
