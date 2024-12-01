import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FETCH_FAVORITE_CITIES_ACTION,
  SAVE_FAVORITE_CITY_ACTION,
  REMOVE_FAVORITE_CITY_ACTION,
} from "./constants";
import {
  FavoriteCitiesStore,
  FavoriteCity,
  RemoveFavoriteCityDto,
  SaveFavoriteCityDto,
} from "./types";

const initialState: FavoriteCitiesStore = {
  areFavoriteCitiesLoading: false,
  favoriteCities: [],
};

export const favoriteCitiesSlice = createSlice({
  name: "favoriteCities",
  initialState,
  reducers: {
    setAreFavoriteCitiesLoading: (state, action: PayloadAction<boolean>) => {
      state.areFavoriteCitiesLoading = action.payload;
    },

    setFavoriteCities: (state, action: PayloadAction<FavoriteCity[]>) => {
      state.favoriteCities = action.payload;
    },

    addFavoriteCity: (state, action: PayloadAction<FavoriteCity>) => {
      state.favoriteCities.push(action.payload);
    },

    removeFavoriteCityById: (state, action: PayloadAction<string>) => {
      state.favoriteCities = state.favoriteCities.filter(
        (city) => city.id !== action.payload
      );
    },

    clearFavoriteCitiesStore: (state) => {
      state.areFavoriteCitiesLoading = false;

      state.favoriteCities = initialState.favoriteCities;
    },
  },
});

export const fetchFavoriteCities = createAction<string>(
  FETCH_FAVORITE_CITIES_ACTION
);
export const saveFavoriteCity = createAction<SaveFavoriteCityDto>(
  SAVE_FAVORITE_CITY_ACTION
);
export const removeFavoriteCity = createAction<RemoveFavoriteCityDto>(
  REMOVE_FAVORITE_CITY_ACTION
);

export const {
  setAreFavoriteCitiesLoading,
  setFavoriteCities,
  addFavoriteCity,
  removeFavoriteCityById,
  clearFavoriteCitiesStore,
} = favoriteCitiesSlice.actions;
