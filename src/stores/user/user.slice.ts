import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FETCH_USER_ACTION } from "./constants";
import { UserResponse, UserStore } from "./types";

const initialState: UserStore = {
  id: null,
  email: null,
  isUserLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },

    setUser: (state, action: PayloadAction<UserResponse>) => {
      const { id, email } = action.payload;
      state.id = id;
      state.email = email;
      state.isUserLoading = false;
    },

    clearUserStore: (state) => {
      state.id = null;
      state.email = null;

      state.isUserLoading = initialState.isUserLoading;
    },
  },
});

export const fetchUser = createAction(FETCH_USER_ACTION);

export const { setIsUserLoading, setUser, clearUserStore } = userSlice.actions;
