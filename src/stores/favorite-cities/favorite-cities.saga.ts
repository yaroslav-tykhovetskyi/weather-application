import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  addFavoriteCity,
  removeFavoriteCityById,
  setAreFavoriteCitiesLoading,
  setFavoriteCities,
} from "./favorite-cities.slice";
import {
  FavoriteCitiesResponse,
  RemoveFavoriteCityDto,
  SaveFavoriteCityDto,
} from "./types";
import {
  FETCH_FAVORITE_CITIES_ACTION,
  REMOVE_FAVORITE_CITY_ACTION,
  SAVE_FAVORITE_CITY_ACTION,
} from "./constants";

export function* fetchFavoriteCitiesSaga({
  payload,
}: PayloadAction<string>): Generator<unknown> {
  try {
    yield put(setAreFavoriteCitiesLoading(true));

    const apiResponsePromise = yield call(
      fetch,
      `/api/users/${payload}/favorite-cities`
    );

    if (!apiResponsePromise.ok) {
      throw new Error("Failed to fetch favorite cities");
    }

    const data: FavoriteCitiesResponse = yield apiResponsePromise.json();

    yield put(setFavoriteCities(data.favoriteCities));

    return data;
  } catch (error) {
    // TODO: dispatch error
    console.error("Error fetching favorite cities:", error);
  } finally {
    yield put(setAreFavoriteCitiesLoading(false));
  }

  return null;
}

export function* saveFavoriteCitySaga({
  payload,
}: PayloadAction<SaveFavoriteCityDto>): Generator<unknown> {
  try {
    const { userId, cityName } = payload;
    yield put(setAreFavoriteCitiesLoading(true));

    const apiResponsePromise = yield call(
      fetch,
      `/api/users/${userId}/favorite-cities`,
      { method: "POST", body: JSON.stringify({ cityName }) }
    );

    if (!apiResponsePromise.ok) {
      throw new Error("Failed to save favorite city");
    }

    const data = yield apiResponsePromise.json();

    yield put(addFavoriteCity(data));

    return data;
  } catch (error) {
    // TODO: dispatch error
    console.error("Error saving favorite city:", error);
  } finally {
    yield put(setAreFavoriteCitiesLoading(false));
  }

  return null;
}

export function* removeFavoriteCitySaga({
  payload,
}: PayloadAction<RemoveFavoriteCityDto>): Generator<unknown> {
  try {
    const { userId, cityId } = payload;
    yield put(setAreFavoriteCitiesLoading(true));

    const apiResponsePromise = yield call(
      fetch,
      `/api/users/${userId}/favorite-cities/${cityId}`,
      { method: "DELETE" }
    );

    if (!apiResponsePromise.ok) {
      throw new Error("Failed to remove favorite city");
    }

    const data = yield apiResponsePromise.json();

    yield put(removeFavoriteCityById(cityId));

    return data;
  } catch (error) {
    // TODO: dispatch error
    console.error("Error removing favorite city:", error);
  } finally {
    yield put(setAreFavoriteCitiesLoading(false));
  }

  return null;
}

export function* favoriteCitiesSaga() {
  yield takeEvery(FETCH_FAVORITE_CITIES_ACTION, fetchFavoriteCitiesSaga);
  yield takeLatest(REMOVE_FAVORITE_CITY_ACTION, removeFavoriteCitySaga);
  yield takeLatest(SAVE_FAVORITE_CITY_ACTION, saveFavoriteCitySaga);
}
