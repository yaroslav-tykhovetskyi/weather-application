import { RootState } from "@/stores/store";

export const selectAreFavoriteCitiesLoading = (state: RootState) =>
  state.favoriteCities.areFavoriteCitiesLoading;

export const selectFavoriteCities = (state: RootState) =>
  state.favoriteCities.favoriteCities;
