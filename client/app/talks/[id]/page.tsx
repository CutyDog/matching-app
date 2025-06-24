'use client'

import { useState, use } from 'react';
import { gql, useQuery, useSubscription, useMutation } from '@apollo/client';
import { ChatRoom, ChatMessage } from '@/graphql/graphql';
import { MessageField } from '@/components/forms';
import { MessageItem } from '@/components/chats';

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
          profile {
            avatarUrl
          }
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
          profile {
            avatarUrl
          }
        }
      }
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($chatRoomId: ID!, $content: String!) {
    sendChatMessage(input: { chatRoomId: $chatRoomId, content: $content }) {
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

export default function TalksChatRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, loading } = useQuery<{ chatRoom: ChatRoom }>(GET_CHAT_ROOM, { variables: { id } });
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sendMessage, { loading: sending }] = useMutation(SEND_MESSAGE_MUTATION);

  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { chatRoomId: id },
    onData: ({ data }) => {
      const newMessage = data?.data?.newMessage?.chatMessage;
      if (newMessage) {
        setNewMessages((prev) => {
          // すでに同じIDのメッセージがあれば追加しない
          if (prev.some((msg) => msg.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      }
    },
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await sendMessage({ variables: { chatRoomId: id, content: input } });
      setInput('');
    } catch (err) {
      alert('送信に失敗しました: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  if (loading) return <p>Loading...</p>

  const chatRoom = data?.chatRoom;

  if (!chatRoom) return <p>Chat room not found</p>

  // メッセージを時系列順でまとめる
  const allMessages = [...chatRoom.chatMessages, ...newMessages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0 p-4">
        <h1 className="text-lg font-bold">トーク</h1>
        <p className="text-sm text-gray-500">{chatRoom.users.map((user) => user.name).join(', ')}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {allMessages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
          />
        ))}
      </div>
      <form onSubmit={handleSend} className="flex items-center p-4">
        <MessageField
          input={input}
          setInput={setInput}
          disabled={sending}
        />
      </form>
    </div>
  );
}