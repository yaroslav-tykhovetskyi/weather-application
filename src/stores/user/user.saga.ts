import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USER_ACTION } from "./constants";
import { setIsUserLoading, setUser } from "./user.slice";
import { UserResponse } from "./types";
import { fetchFavoriteCities } from "../favorite-cities/favorite-cities.slice";

export function* fetchUserSaga(): Generator<unknown, UserResponse | null> {
  try {
    yield put(setIsUserLoading(true));

    const apiResponsePromise = yield call(fetch, "/api/users/me");

    if (!apiResponsePromise.ok) {
      throw new Error("Failed to fetch current user");
    }

    const { user }: { user: UserResponse | null } =
      yield apiResponsePromise.json();

    if (user) {
      yield put(setUser(user));
      yield put(fetchFavoriteCities(user.id));
    }

    return user || null;
  } catch (error) {
    // TODO: dispatch error
    console.error("Error fetching user:", error);
  } finally {
    yield put(setIsUserLoading(false));
  }

  return null;
}

export function* userSaga() {
  yield takeEvery(FETCH_USER_ACTION, fetchUserSaga);
}
