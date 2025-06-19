'use client';

import { createContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { CURRENT_ACCOUNT } from "@/graphql/queries/users/currentAccount";
import { Query, User } from "@/graphql/graphql";

interface IAuthContext {
  currentUser: User | null;
}

const AuthContext = createContext<IAuthContext>({ currentUser: null });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setcurrentUser] = useState<User | null>(null);
  const { data, loading, error } = useQuery<{ currentAccount: Query["currentAccount"] }>(CURRENT_ACCOUNT);

  useEffect(() => {
    async function fetchData() {
      if (data?.currentAccount) {
        setcurrentUser(data.currentAccount);
      } else {
        setcurrentUser(null);
      }
    }

    fetchData();
  }, [data, loading, error]);

  return (
    <AuthContext.Provider value={{
      currentUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };