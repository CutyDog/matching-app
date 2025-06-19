'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ダミー認証: ユーザー名/パスワードが空でなければ成功
    if (username && password) {
      localStorage.setItem('token', 'dummy-jwt-token');
      router.replace('/account');
    } else {
      setError('ユーザー名とパスワードを入力してください');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">ログイン</h1>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-2 w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-2 w-full p-2 border rounded"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">ログイン</button>
      </form>
    </div>
  );
}