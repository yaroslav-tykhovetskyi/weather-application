import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USER_ACTION } from "./constants";
import { setIsUserLoading, setUser } from "./user.slice";
import { UserResponse } from "./types";
import { fetchFavoriteCities } from "../favorite-cities/favorite-cities.slice";

export function* fetchUserSaga(): Generator<unknown, UserResponse | null> {
  try {
    yield put(setIsUserLoading(true));

    const apiResponsePromise = yield call(
      fetch,
      `http://localhost:3000/api/users/me`
    );

    const data: { user: UserResponse | null } = yield apiResponsePromise.json();

    if (data.user) {
      yield put(setUser(data.user));
      yield put(fetchFavoriteCities(data.user.id));
    }

    return data.user || null;
  } catch {
  } finally {
    yield put(setIsUserLoading(false));
  }

  return null;
}

export function* userSaga() {
  yield takeEvery(FETCH_USER_ACTION, fetchUserSaga);
}
