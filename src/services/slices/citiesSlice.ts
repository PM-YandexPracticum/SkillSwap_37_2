import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Place {
  id: number;
  name: string;
  selected: boolean;
}

interface PlacesState {
  list: Place[];
}

const initialState: PlacesState = {
  list: [],
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    togglePlace(state, action: PayloadAction<number>) {
      const place = state.list.find(c => c.id === action.payload);
      if (place) place.selected = !place.selected;
    },
  },
});

export const { togglePlace } = placesSlice.actions;
export default placesSlice.reducer;