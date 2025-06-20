'use client';

import { useRouter } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import { Query } from '@/graphql/graphql';

const CURRENT_ACCOUNT = gql`
  query currentAccount {
    currentAccount {
      id
      name
      lastLoginAt
      activeLikes {
        id
        createdAt
        receiver {
          id
          name
        }
      }
      passiveLikes {
        id
        createdAt
        sender {
          id
          name
        }
      }
    }
  }
`;

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleString();
}

export default function Home() {
  const router = useRouter();
  const { data, loading } = useQuery<{ currentAccount: Query["currentAccount"] }>(CURRENT_ACCOUNT);
  const user = data?.currentAccount;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light">
        <div className="bg-background/90 shadow-xl rounded-xl px-8 py-10 w-full max-w-md flex flex-col items-center border border-muted">
          <p className="text-lg text-foreground mb-4">ユーザー情報が取得できませんでした</p>
          <button
            className="px-6 py-2 bg-primary text-foreground rounded hover:bg-primary-dark"
            onClick={() => router.push('/login')}
          >
            ログインページへ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="bg-background/90 shadow-xl rounded-xl px-8 py-10 mb-10 border border-muted text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">{user.name}</h1>
          <p className="text-foreground mb-2">最終ログイン: {formatDate(user.lastLoginAt)}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">自分がいいねしたユーザー</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.activeLikes && user.activeLikes.length > 0 ? (
              user.activeLikes.map((like) => (
                <div
                  key={like.id}
                  className="bg-background rounded-lg shadow p-4 flex flex-col items-start border border-muted"
                >
                  <span className="text-lg font-medium text-foreground mb-1">{like.receiver.name}</span>
                  <span className="text-xs text-foreground/60">いいね日時: {formatDate(like.createdAt)}</span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-foreground/40">まだ誰にもいいねしていません</div>
            )}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">自分にいいねしたユーザー</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.passiveLikes && user.passiveLikes.length > 0 ? (
              user.passiveLikes.map((like) => (
                <div
                  key={like.id}
                  className="bg-background rounded-lg shadow p-4 flex flex-col items-start border border-muted"
                >
                  <span className="text-lg font-medium text-foreground mb-1">{like.sender.name}</span>
                  <span className="text-xs text-foreground/60">いいね日時: {formatDate(like.createdAt)}</span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-foreground/40">まだ誰にもいいねされていません</div>
            )}
          </div>
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