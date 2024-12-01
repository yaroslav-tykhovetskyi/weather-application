import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FETCH_WEATHER_ACTION } from "./constants";
import { WeatherApiResponse, WeatherSearchStore } from "./types";

const initialState: WeatherSearchStore = {
  isError: false,
  isFetching: false,
};

export const weatherSearchSlice = createSlice({
  name: "weatherSearch",
  initialState,
  reducers: {
    setIsWeatherLoading: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setSearchResults: (state, action: PayloadAction<WeatherApiResponse>) => {
      state.searchResults = action.payload;
      state.isError = false;
      state.isFetching = false;
    },

    setSearchResultsErrored: (state) => {
      state.searchResults = undefined;
      state.isError = true;
      state.isFetching = false;
    },

    clearWeatherSearchResults: (state) => {
      state.searchQuery = initialState.searchQuery;
      state.searchResults = initialState.searchResults;
      state.isError = initialState.isError;
      state.isFetching = initialState.isFetching;
    },
  },
});

export const fetchWeather = createAction<string>(FETCH_WEATHER_ACTION);

export const {
  setIsWeatherLoading,
  setSearchResults,
  setSearchQuery,
  setSearchResultsErrored,
  clearWeatherSearchResults,
} = weatherSearchSlice.actions;
