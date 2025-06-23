'use client'

import { useState, useEffect, use } from 'react';
import { gql, useQuery, useSubscription } from '@apollo/client';
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

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage($chatRoomId: ID!) {
    newMessage(chatRoomId: $chatRoomId) {
      chatMessage {
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
`;

type Params = Promise<{ id: string }>

export default function TalksChatRoomPage({ params }: { params: Params }) {
  const { id } = use(params);
  const { data } = useQuery<{ chatRoom: ChatRoom }>(GET_CHAT_ROOM, { variables: { id } });
  const chatRoom = data?.chatRoom;
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (chatRoom) {
      setMessages(chatRoom.chatMessages);
    }
  }, [chatRoom]);

  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { chatRoomId: id },
    onData: ({ data }) => {
      const newMessage = data?.data?.newMessage?.chatMessage;
      if (newMessage) {
        setMessages((prev) => {
          // すでに同じIDのメッセージがあれば追加しない
          if (prev.some((msg) => msg.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      }
    },
  });

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