import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { FETCH_WEATHER_ACTION } from "./constants";
import { setIsWeatherLoading, setSearchResults } from "./weather-search.slice";

export function* fetchWeatherSaga({
  payload,
}: PayloadAction<string>): Generator<unknown> {
  try {
    yield put(setIsWeatherLoading(true));

    const apiResponsePromise = yield call(
      fetch,
      `/api/weather?query=${payload}`
    );

    if (!apiResponsePromise.ok) {
      throw new Error("Failed to fetch weather search results");
    }

    const data = yield apiResponsePromise.json();

    yield put(setSearchResults(data));

    return data;
  } catch (error) {
    // TODO: dispatch error
    console.error("Error fetching weather search results:", error);
  } finally {
    yield put(setIsWeatherLoading(false));
  }

  return null;
}

export function* weatherSearchSaga() {
  yield takeEvery(FETCH_WEATHER_ACTION, fetchWeatherSaga);
}
