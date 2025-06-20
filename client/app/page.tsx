'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth';

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleString();
}

export default function Home() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light py-10 px-2">
        <div className="max-w-3xl mx-auto">
          <div className="bg-background/90 shadow-xl rounded-xl px-8 py-10 mb-10 border border-muted text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">{currentUser.name}</h1>
            <p className="text-foreground mb-2">最終ログイン: {formatDate(currentUser.lastLoginAt)}</p>
          </div>

          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-primary text-background rounded hover:bg-primary-dark"
              onClick={() => router.push('/account')}
            >
              アカウントページへ
            </button>
          </div>
        </div>
      </div>
    );
  }
}