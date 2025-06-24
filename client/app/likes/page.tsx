'use client';

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Like } from '@/graphql/graphql';
import { LikeCard } from '@/components/users';

const GET_LIKES = gql`
  query LikesCurrentAccount {
    currentAccount {
      activeLikes {
        id
        createdAt
        receiver {
          id
          name
          profile {
            avatarUrl
          }
        }
      }
      passiveLikes {
        id
        createdAt
        sender {
          id
          name
          profile {
            avatarUrl
          }
        }
      }
    }
  }
`;

export default function LikesPage() {
  const { data } = useQuery<{ currentAccount: { activeLikes: Like[], passiveLikes: Like[] } }>(GET_LIKES);
  const [activeTab, setActiveTab] = useState('passive');

  const activeLikes = data?.currentAccount?.activeLikes || [];
  const passiveLikes = data?.currentAccount?.passiveLikes || [];

  const tabs = [
    { name: '自分から', key: 'active' },
    { name: '相手から', key: 'passive' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-2 min-h-screen">
      <div className="flex w-full border-muted shadow justify-around items-center h-16 mb-4">
        <div className="text-sm font-medium text-center border-b border-gray-200 w-full">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab) => (
              <li
                key={tab.key}
                className={`me-2 inline-block p-4 border-b-2 border-transparent cursor-pointer ${
                  tab.key === activeTab ? 'text-foreground border-primary' : 'text-foreground/70 hover:text-foreground'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'active' && (
          <div className="grid grid-cols-2 gap-4">
            {activeLikes.length > 0 ? activeLikes.map(like => (
              <LikeCard
                key={like.id}
                user={like.receiver}
                date={new Date(like.createdAt).toLocaleDateString()}
                message="「いいね！」しました"
              />
            )) : <p className="col-span-2 text-center text-gray-400">まだ誰にも「いいね！」していません。</p>}
          </div>
        )}
        {activeTab === 'passive' && (
          <div className="grid grid-cols-2 gap-4">
            {passiveLikes.length > 0 ? passiveLikes.map(like => (
              <LikeCard
                key={like.id}
                user={like.sender}
                date={new Date(like.createdAt).toLocaleDateString()}
                message="「いいね！」が届きました"
              />
            )) : <p className="col-span-2 text-center text-gray-400">まだ誰からも「いいね！」されていません。</p>}
          </div>
        )}
      </div>
    </div>
  );
}