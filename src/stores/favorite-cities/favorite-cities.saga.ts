import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
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
      `http://localhost:3000/api/users/${payload}/favorite-cities`
    );

    const data: FavoriteCitiesResponse = yield apiResponsePromise.json();

    yield put(setFavoriteCities(data.favoriteCities));

    return data;
  } catch {
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
      `http://localhost:3000/api/users/${userId}/favorite-cities`,
      { method: "POST", body: JSON.stringify({ cityName }) }
    );

    const data = yield apiResponsePromise.json();

    if (apiResponsePromise.ok) {
      yield put(addFavoriteCity(data));
    }

    return data;
  } catch {
  } finally {
    yield put(setAreFavoriteCitiesLoading(false));
  }

  return null;
}

export function* removeFavoriteCitySaga({
  payload,
}: PayloadAction<RemoveFavoriteCityDto>): Generator<
  PutEffect | CallEffect,
  FavoriteCitiesResponse | null,
  // TODO: change any to current props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> {
  try {
    const { userId, cityId } = payload;
    yield put(setAreFavoriteCitiesLoading(true));

    const apiResponsePromise = yield call(
      fetch,
      `http://localhost:3000/api/users/${userId}/favorite-cities/${cityId}`,
      { method: "DELETE" }
    );

    const data = yield apiResponsePromise.json();

    if (apiResponsePromise.ok) {
      yield put(removeFavoriteCityById(cityId));
    }

    return data;
  } catch {
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
