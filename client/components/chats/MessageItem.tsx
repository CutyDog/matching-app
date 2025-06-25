'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/auth';
import { ChatMessage } from '@/graphql/graphql';
import Image from 'next/image';

export const MessageItem = ({
  // isMe,
  message,
}: {
  // isMe: boolean;
  message: ChatMessage;
}) => {
  const { currentUser } = useContext(AuthContext);
  const isMe = currentUser?.id === message.user.id;
  const src = message.user.profile?.avatarUrl || '/default-avatar.png';
  const userName = message.user.name;
  const content = message.content;

  return (
    <div
      key={message.id}
      className={`flex items-end ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      {!isMe && (
        <Image
          src={src}
          alt={userName}
          width={36}
          height={36}
          className="rounded-full mr-2"
        />
      )}

      <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow ${isMe ? 'bg-green-200 text-right ml-8' : 'bg-white text-left mr-8'}`}>
        <div className="text-xs text-gray-500 mb-1">{userName}</div>
        <div className="break-words whitespace-pre-line text-black">{content}</div>
      </div>

      {isMe && (
        <Image
          src={src}
          alt={userName}
          width={36}
          height={36}
          className="rounded-full ml-2"
        />
      )}
    </div>
  );
}