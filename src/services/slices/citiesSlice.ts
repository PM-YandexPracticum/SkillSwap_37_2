import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface City {
  id: number;
  name: string;
  selected: boolean;
}

interface CitiesState {
  list: City[];
}

const initialState: CitiesState = {
  list: [
    { id: 1, name: "Москва", selected: false },
    { id: 2, name: "Санкт-Петербург", selected: false },
    { id: 3, name: "Новосибирск", selected: false },
    { id: 4, name: "Екатеринбург", selected: false },
    { id: 5, name: "Казань", selected: false },
  ],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    toggleCity(state, action: PayloadAction<number>) {
      const city = state.list.find(c => c.id === action.payload);
      if (city) city.selected = !city.selected;
    },
  },
});

export const { toggleCity } = citiesSlice.actions;
export default citiesSlice.reducer;