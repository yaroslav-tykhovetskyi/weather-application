export interface RemoveFavoriteCityDto {
  userId: string;
  cityId: string;
}

export interface SaveFavoriteCityDto {
  userId: string;
  cityName: string;
}

export interface FavoriteCity {
  id: string;
  cityName: string;
}

export interface FavoriteCitiesResponse {
  favoriteCities: FavoriteCity[];
}

export interface FavoriteCitiesStore {
  areFavoriteCitiesLoading: boolean;
  favoriteCities: FavoriteCity[];
}
