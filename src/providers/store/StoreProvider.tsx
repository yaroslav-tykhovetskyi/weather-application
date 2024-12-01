"use client";

import { AppStore, makeStore } from "@/stores/store";
import { fetchUser } from "@/stores/user/user.slice";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchUser());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
