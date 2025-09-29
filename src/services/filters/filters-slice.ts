// src\services\filters\filters-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GENDERS, TGender } from '@api/types';
import { SKILL_TYPES, TSkillType } from '../../shared/types/filters';

type FiltersState = {
  skillType: TSkillType;
  categories: string[];
  gender: TGender;
  places: number[];
};

const getInitialState = (): FiltersState => ({
  skillType: SKILL_TYPES.ALL,
  categories: [],
  gender: GENDERS.UNSPECIFIED,
  places: [],
});

const initialState = getInitialState();

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSkillType: (state, action: PayloadAction<TSkillType>) => {
      state.skillType = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      if (state.categories.includes(action.payload)) {
        state.categories = state.categories.filter(c => c !== action.payload);
      } else {
        state.categories.push(action.payload);
      }
    },
    setGender: (state, action: PayloadAction<TGender>) => {
      state.gender = action.payload;
    },
    setPlaces: (state, action: PayloadAction<number[]>) => {
      state.places = action.payload;
    },
    resetFilters: () => getInitialState(),
  },
});

export const { setSkillType, toggleCategory, setGender, setPlaces, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
