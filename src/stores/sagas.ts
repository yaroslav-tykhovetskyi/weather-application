import { all, fork } from "redux-saga/effects";
import { weatherSearchSaga } from "./weather-search/weather-search.saga";
import { userSaga } from "./user/user.saga";
import { favoriteCitiesSaga } from "./favorite-cities/favorite-cities.saga";

const sagas = [weatherSearchSaga, userSaga, favoriteCitiesSaga];

export function* rootSaga() {
  yield all(sagas.map(fork));
}
