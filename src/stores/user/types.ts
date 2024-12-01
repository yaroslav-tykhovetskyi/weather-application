export interface UserResponse {
  id: string;
  email: string;
}

export interface UserStore {
  id: string | null;
  email: string | null;
  isUserLoading: boolean;
}
