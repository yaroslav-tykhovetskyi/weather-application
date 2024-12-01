"use client";

import { useAppSelector } from "@/stores/hooks";
import Link from "next/link";
import { selectIsUserLoading, selectUserEmail } from "@/stores/user/selectors";
import { MdPerson } from "react-icons/md";
import { useCallback } from "react";

export default function Navbar() {
  const userEmail = useAppSelector(selectUserEmail);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  const renderUserSection = useCallback(() => {
    if (isUserLoading) {
      return (
        <div className="bg-white/50 py-2 px-5 rounded-2xl text-center">
          Loading...
        </div>
      );
    }

    return (
      <div className="flex flex-row gap-5">
        {userEmail ? (
          <Link
            className="flex flex-row items-center gap-1 py-2 px-5 rounded-2xl bg-white/50 hover:bg-black/25 active:bg-black/50"
            href="/user/profile"
          >
            <MdPerson />
            <p className="truncate">{userEmail}</p>
          </Link>
        ) : (
          <>
            <Link
              className="bg-white/50 py-2 px-5 rounded-2xl text-center hover:bg-black/25 active:bg-black/50"
              href="/auth/login"
            >
              Login
            </Link>
            <Link
              className="bg-white/50 py-2 px-5 rounded-2xl text-center hover:bg-black/25 active:bg-black/50 truncate"
              href="/auth/register"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    );
  }, [isUserLoading, userEmail]);

  return (
    <nav className="flex flex-row justify-between p-5 items-center">
      <Link className="text-white text-3xl italic font-bold truncate" href="/">
        Weather App
      </Link>
      {renderUserSection()}
    </nav>
  );
}
