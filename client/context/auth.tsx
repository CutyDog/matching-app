'use client';

import { createContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { Query, User } from "@/graphql/graphql";
import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";
interface IAuthContext {
  currentUser: User | null;
}

const CURRENT_ACCOUNT = gql`
  query currentAccount {
    currentAccount {
      id
      name
      email
      lastLoginAt
      profile {
        birthday
        gender
        introduction
        avatarUrl
      }
    }
  }
`;

const AuthContext = createContext<IAuthContext>({ currentUser: null });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [currentUser, setcurrentUser] = useState<User | null>(null);
  const { data, loading, error } = useQuery<{ currentAccount: Query["currentAccount"] }>(CURRENT_ACCOUNT);

  useEffect(() => {
    async function fetchData() {
      if (loading) return;

      if (data?.currentAccount) {
        setcurrentUser(data.currentAccount);
      } else {
        router.replace('/login');
      }
    }

    fetchData();
  }, [data, loading, error, router]);

  if (loading) return;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };