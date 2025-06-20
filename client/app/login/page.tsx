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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">ログイン</h1>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-2 w-full p-2 border rounded text-foreground"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-2 w-full p-2 border rounded text-foreground"
          required
        />
        {error && <div className="text-error mb-2">{error}</div>}
        <button type="submit" className="w-full text-foreground py-2 rounded" disabled={loading}>
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </div>
  );
}