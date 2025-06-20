'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/auth';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light">
        <div className="bg-background/90 shadow-xl rounded-xl px-8 py-10 w-full max-w-md flex flex-col items-center border border-muted">
          <h1 className="text-3xl font-bold text-primary mb-4 tracking-tight">マイページ</h1>
          <div className="mb-2 text-foreground text-lg font-semibold">{currentUser.name}</div>
          <div className="mb-6 text-foreground text-sm">{currentUser.email}</div>
          <button
            className="px-6 py-2 bg-error text-foreground font-semibold rounded hover:bg-error/80 transition"
            onClick={() => {
              localStorage.removeItem('Token');
              router.replace('/login');
            }}
          >
            ログアウト
          </button>
        </div>
      </div>
    );
  }
}