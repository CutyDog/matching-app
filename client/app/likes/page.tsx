'use client';

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Like } from '@/graphql/graphql';

const GET_LIKES = gql`
  query currentAccount {
    currentAccount {
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
    <div>
      <div className="flex w-full border-muted shadow justify-around items-center h-16">
        <div className="text-sm font-medium text-center border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab) => (
              <li
                key={tab.key}
                className={`me-2 inline-block p-4 border-b-2 border-transparent ${
                  tab.key === activeTab ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        {activeTab === 'active' && (
          <ul className='space-y-4'>
            {activeLikes.length > 0 ? activeLikes.map(like => (
              <li key={like.id} className='p-4 border rounded-lg shadow-sm'>
                <p className='font-semibold'>{like.receiver.name}さんに「いいね！」しました</p>
                <p className='text-sm text-gray-500'>{new Date(like.createdAt).toLocaleString()}</p>
              </li>
            )) : <p>まだ誰にも「いいね！」していません。</p>}
          </ul>
        )}
        {activeTab === 'passive' && (
          <ul className='space-y-4'>
            {passiveLikes.length > 0 ? passiveLikes.map(like => (
              <li key={like.id} className='p-4 border rounded-lg shadow-sm'>
                <p className='font-semibold'>{like.sender.name}さんから「いいね！」が届きました</p>
                <p className='text-sm text-gray-500'>{new Date(like.createdAt).toLocaleString()}</p>
              </li>
            )) : <p>まだ誰からも「いいね！」されていません。</p>}
          </ul>
        )}
      </div>
    </div>
  );
}