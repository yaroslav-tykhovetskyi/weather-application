"use client";

import { useAppDispatch } from "@/stores/hooks";
import { clearUserStore } from "@/stores/user/user.slice";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import FavoriteCitiesSection from "../FavoriteCitiesSection/FavoriteCitiesSection";

const UserProfilePanel = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogoutClick = useCallback(
    () =>
      signOut({ redirect: false }).then(() => {
        dispatch(clearUserStore());

        router.push("/");
      }),
    [dispatch, router]
  );

  return (
    <div className="px-5 mt-10 flex flex-col gap-10">
      <h1 className="text-3xl text-white font-bold italic text-center">
        Profile
      </h1>
      <div className="flex flex-row justify-center">
        <button
          className="bg-white/25 py-2 px-10 rounded-2xl text-center hover:bg-black/25 active:bg-black/50"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
      <FavoriteCitiesSection />
    </div>
  );
};

export default UserProfilePanel;
