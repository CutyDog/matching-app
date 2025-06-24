'use client'

import { gql, useQuery } from '@apollo/client';
import { ChatRoom } from '@/graphql/graphql';
import Link from 'next/link';

const GET_CHAT_ROOMS = gql`
  query TalksCurrentAccount {
    currentAccount {
      chatRooms {
        id
        createdAt
        updatedAt
        users {
          id
          name
        }
      }
    }
  }
`

export default function TalksPage() {
  const { data } = useQuery<{ currentAccount: { chatRooms: ChatRoom[] } }>(GET_CHAT_ROOMS);
  const chatRooms = data?.currentAccount?.chatRooms || [];

  return (
    <div>
      {chatRooms.map((chatRoom) => (
        <div key={chatRoom.id}>
          <Link href={`/talks/${chatRoom.id}`} key={chatRoom.id}>
            <h2>{chatRoom.id}</h2>
            <p>{chatRoom.users.map((user) => user.name).join(', ')}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}