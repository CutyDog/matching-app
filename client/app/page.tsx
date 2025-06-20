'use client';

import { useRouter } from 'next/navigation';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
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

export default function Home() {
  const router = useRouter();
  const { data } = useQuery<{ currentAccount: Query["currentAccount"] }>(CURRENT_ACCOUNT);
  const user = data?.currentAccount;

  if (data) {
    return (
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.lastLoginAt}</p>
        <h2>Active Likes</h2>
        <ul>
          {user?.activeLikes?.map((like) => (
            <li key={like.id}>{like.receiver.name}</li>
          ))}
        </ul>
        <h2>Passive Likes</h2>
        <ul>
          {user?.passiveLikes?.map((like) => (
            <li key={like.id}>{like.sender.name}</li>
          ))}
        </ul>
        <button onClick={() => router.push('/account')}>Account</button>
      </div>
    );
  }
}