'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { AuthContext } from '@/context/auth';
import { SignInPayload } from '@/graphql/graphql';
import { gql } from '@apollo/client';
import { TextField } from '@/components/forms';
import { SubmitButton } from '@/components/buttons';

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

  const [signIn, { loading }] = useMutation<{ signIn: SignInPayload }>(SIGN_IN);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    signIn({ variables: { email, password } }).then(({ data }) => {
      if (data?.signIn?.token) {
        localStorage.setItem('Token', data.signIn.token);
        router.push('/account');
      } else {
        setError('認証に失敗しました');
      }
    });
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-muted">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          ログイン
        </h2>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <TextField
              label="メールアドレス"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="パスワード"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <div className="text-sm text-error">{error}</div>}

            <div className="mt-12">
              <SubmitButton isSubmitting={loading}>
                ログイン
              </SubmitButton>
            </div>
          </form>

          <p className="mt-12 text-center">
            アカウントをお持ちでない方は{' '}
            <Link href="/signup" className="text-primary underline">新規登録</Link>
          </p>
        </div>
      </div>
    </div>
  );
}