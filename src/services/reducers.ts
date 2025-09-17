// src\services\reducers.ts

import { combineSlices } from '@reduxjs/toolkit';
import { usersSlice } from './users/users-slice';
import { userSlice } from './user/user-slice';

export const rootReducer = combineSlices(
    usersSlice,
    userSlice
);