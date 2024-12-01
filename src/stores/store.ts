import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import { weatherSearchSlice } from "./weather-search/weather-search.slice";
import { userSlice } from "./user/user.slice";
import { favoriteCitiesSlice } from "./favorite-cities/favorite-cities.slice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  weatherSearch: weatherSearchSlice.reducer,
  user: userSlice.reducer,
  favoriteCities: favoriteCitiesSlice.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
