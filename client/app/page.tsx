'use client';

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth';

export default function Home() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      router.replace('/account');
    } else {
      router.replace('/login');
    }
  }, [router, currentUser]);

  return null;
}