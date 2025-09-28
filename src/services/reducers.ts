// src\services\reducers.ts

import { combineSlices } from '@reduxjs/toolkit';
import { usersSlice } from './users/users-slice';
import { userSlice } from './user/user-slice';
import { placesSlice } from './places/places-slice';
import { categoriesSlice } from './categories/categories-slice';
import { notificationSlice } from './notifications/notification-slice';
import { popularUsersSlice } from './popularUsers/popular-users-slice';

export const rootReducer = combineSlices(
    categoriesSlice,
    placesSlice,
    usersSlice,
    userSlice,
    notificationSlice,
    popularUsersSlice
);