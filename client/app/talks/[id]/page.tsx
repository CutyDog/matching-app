'use client'

import { useState, useEffect, use } from 'react';
import { gql, useQuery, useSubscription, useMutation } from '@apollo/client';
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

type Params = Promise<{ id: string }>

export default function TalksChatRoomPage({ params }: { params: Params }) {
  const { id } = use(params);
  const { data } = useQuery<{ chatRoom: ChatRoom }>(GET_CHAT_ROOM, { variables: { id } });
  const chatRoom = data?.chatRoom;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sendMessage, { loading: sending }] = useMutation(SEND_MESSAGE_MUTATION);

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
      <form onSubmit={handleSend} style={{ marginTop: 16 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="メッセージを入力"
          disabled={sending}
          style={{ width: '80%' }}
        />
        <button type="submit" disabled={sending || !input.trim()} style={{ marginLeft: 8 }}>
          送信
        </button>
      </form>
    </div>
  );
}