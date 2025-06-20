'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { AuthContext } from '@/context/auth';
import { SignInPayload } from '@/graphql/graphql';
import { gql } from '@apollo/client';

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      router.replace('/account');
    }
  }, [currentUser, router]);

  const [signIn, { loading }] = useMutation<{ signIn: SignInPayload }>(SIGN_IN, {
    onCompleted: (data) => {
      if (data?.signIn?.token) {
        localStorage.setItem('Token', data.signIn.token);
        router.push('/account');
      } else {
        setError('認証に失敗しました');
      }
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    signIn({ variables: { email, password } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light">
      <form onSubmit={handleLogin} className="bg-background/90 shadow-xl rounded-xl px-8 py-10 w-full max-w-md flex flex-col gap-4 border border-muted">
        <h1 className="text-3xl font-bold text-primary text-center mb-2 tracking-tight">ログイン</h1>
        <p className="text-foreground text-center mb-4">アカウント情報を入力してください</p>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-2 w-full p-3 border border-muted rounded focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-muted placeholder:text-gray-400"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-2 w-full p-3 border border-muted rounded focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-muted placeholder:text-gray-400"
          required
        />
        {error && <div className="text-error text-sm mb-2 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded bg-primary text-background font-semibold hover:bg-primary-dark transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </div>
  );
}