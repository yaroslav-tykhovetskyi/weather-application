import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { FETCH_WEATHER_ACTION } from "./constants";
import {
  setIsWeatherLoading,
  setSearchResults,
  setSearchResultsErrored,
} from "./weather-search.slice";

export function* fetchWeatherSaga({
  payload,
}: PayloadAction<string>): Generator<unknown | null> {
  try {
    yield put(setIsWeatherLoading(true));

    const apiResponsePromise = yield call(
      fetch,
      `/api/weather?query=${payload}`
    );

    const data = yield apiResponsePromise.json();

    yield put(setSearchResults(data));

    return data;
  } catch {
    yield put(setSearchResultsErrored());
  } finally {
    yield put(setIsWeatherLoading(false));
  }
}

export function* weatherSearchSaga() {
  yield takeEvery(FETCH_WEATHER_ACTION, fetchWeatherSaga);
}
