import { RootState } from "@/stores/store";

export const selectSearchQuery = (state: RootState) =>
  state.weatherSearch.searchQuery;

export const selectSearchResult = (state: RootState) =>
  state.weatherSearch.searchResults;

export const selectIsWeatherSearchLoading = (state: RootState) =>
  state.weatherSearch.isFetching;

export const selectIsWeatherSearchError = (state: RootState) =>
  state.weatherSearch.isError;
