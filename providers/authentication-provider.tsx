"use client";

import { UserAuth } from "@/lib/misc/types";
import { createContext, ReactNode, useContext } from "react";

export const AuthenticationContext = createContext<UserAuth>({
  loggedIn: false,
  user: null,
});

export default function AuthProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: UserAuth;
}) {
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthenticationContext);
}
