"use client";

import { UserData } from "@/lib/types";
import { createContext, useContext, ReactNode } from "react";

interface UserContextType {
  userData: UserData | null;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  userData: UserData | null;
}

export function UserProvider({ children, userData }: UserProviderProps) {
  const value = {
    userData,
    isAuthenticated: userData !== null,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
