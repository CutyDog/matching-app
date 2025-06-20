'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/auth';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">マイページ</h1>
      <div className="mb-2 text-white">名前: {currentUser?.name}</div>
      <div className="mb-2">メール: {currentUser?.email}</div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          localStorage.removeItem('Token');
          router.replace('/login');
        }}
      >
        ログアウト
      </button>
    </div>
  );
}