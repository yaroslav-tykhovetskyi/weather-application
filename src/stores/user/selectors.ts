import { RootState } from "@/stores/store";

export const selectUserId = (state: RootState) => state.user.id;

export const selectUserEmail = (state: RootState) => state.user.email;

export const selectIsUserLoading = (state: RootState) =>
  state.user.isUserLoading;
