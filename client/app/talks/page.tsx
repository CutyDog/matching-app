'use client'

import { gql, useQuery } from '@apollo/client';
import { ChatRoom, ChatMessage } from '@/graphql/graphql';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth';
import AvatarImage from '@/components/images/AvatarImage';

const GET_CHAT_ROOMS = gql`
  query TalksCurrentAccount {
    currentAccount {
      id
      chatRooms {
        id
        createdAt
        updatedAt
        users {
          id
          name
          profile {
            avatarUrl
          }
        }
        latestMessage {
          id
          content
          createdAt
        }
      }
    }
  }
`

const trimLatestMessage = (latestMessage: ChatMessage) => {
  const maxLength = 15;
  return latestMessage.content.length > maxLength
    ? latestMessage.content.slice(0, maxLength) + '...'
    : latestMessage.content;
};

const formatDate = (date?: string) => {
  if (!date) return '';

  return new Date(date).toLocaleString();
};

export default function TalksPage() {
  const { data } = useQuery<{ currentAccount: { id: string; chatRooms: ChatRoom[] } }>(GET_CHAT_ROOMS);
  const chatRooms = data?.currentAccount?.chatRooms || [];
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto py-4 px-2 space-y-2 min-h-screen">
      <h1 className="text-xl font-bold mb-4">トーク</h1>

      {chatRooms.length === 0 && (
        <div className="text-center text-gray-400 py-8">トークルームがありません</div>
      )}

      {chatRooms.map((chatRoom) => {
        const otherUsers = chatRoom.users.filter(u => u.id !== currentUser?.id);
        const displayUser = otherUsers[0] || chatRoom.users[0]; // 1対1前提
        const avatarUrl = displayUser.profile?.avatarUrl || '/default-avatar.png';
        const latestMessage = chatRoom.latestMessage;
        const trimmedLatestMessage = latestMessage ? trimLatestMessage(latestMessage) : '';

        return (
          <Link
            href={`/talks/${chatRoom.id}`}
            key={chatRoom.id}
            className="flex items-center rounded-xl shadow transition p-3 gap-3"
          >
            <AvatarImage avatarUrl={avatarUrl} size={48} />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{displayUser.name}</div>
              <div className="text-xs text-gray-500 truncate">{trimmedLatestMessage}</div>
            </div>
            <div className="text-xs text-gray-500">{formatDate(latestMessage?.createdAt)}</div>
          </Link>
        );
      })}
    </div>
  );
}