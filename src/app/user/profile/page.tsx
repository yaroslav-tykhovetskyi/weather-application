"use client";

import FavoriteCitiesSection from "@/components/FavoriteCitiesSection/FavoriteCitiesSection";
import { PROFILE_PAGE_MAIN_HEADING } from "./constants";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { signOut } from "next-auth/react";
import { clearUserStore } from "@/stores/user/user.slice";
export default function UserProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  return (
    <div className="px-5 mt-10 flex flex-col gap-10">
      <h1 className="text-3xl text-white font-bold italic text-center">
        {PROFILE_PAGE_MAIN_HEADING}
      </h1>
      <div className="flex flex-row justify-center">
        <button
          className="bg-white/25 py-2 px-10 rounded-2xl text-center hover:bg-black/25 active:bg-black/50"
          onClick={() =>
            signOut({ redirect: false }).then(() => {
              dispatch(clearUserStore());

              if (!["/", "/weather-details"].includes(pathname)) {
                router.push("/");
              }
            })
          }
        >
          Logout
        </button>
      </div>
      <FavoriteCitiesSection />
    </div>
  );
}
