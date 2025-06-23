'use client'

import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ChatRoom, ChatMessage } from '@/graphql/graphql';

const GET_CHAT_ROOM = gql`
  query TalksChatRoom($id: ID!) {
    chatRoom(id: $id) {
      id
      createdAt
      updatedAt
      users {
        id
        name
      }
      chatMessages {
        id
        content
        createdAt
        updatedAt
        user {
          id
          name
        }
      }
    }
  }
`

export default function TalksChatRoomPage({ params }: { params: { id: string } }) {
  const { data } = useQuery<{ chatRoom: ChatRoom }>(GET_CHAT_ROOM, { variables: { id: params.id } });
  const chatRoom = data?.chatRoom;
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (chatRoom) {
      setMessages(chatRoom.chatMessages);
    }
  }, [chatRoom]);

  return (
    <div>
      <h1>{chatRoom?.id}</h1>
      <p>{chatRoom?.users.map((user) => user.name).join(', ')}</p>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
          <p>{message.user.name}</p>
        </div>
      ))}
    </div>
  );
}