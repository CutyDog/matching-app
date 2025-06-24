import Image from 'next/image';
import { User } from '@/graphql/graphql';

const trimIntroduction = (introduction: string) => {
  // 紹介文を最大40文字でトリミング
  const maxLength = 40;
  return introduction.length > maxLength
    ? introduction.slice(0, maxLength) + '...'
    : introduction;
};

export default function CandidateCard({ user }: { user: User }) {
  if (!user) return;

  const trimmedIntroduction = trimIntroduction(user.profile?.introduction || '');

  return (
    <div className="w-full h-120 bg-white rounded-xl shadow-lg flex flex-col p-0 border border-gray-200 overflow-hidden">
      <div className="flex bg-gray-50 h-80">
        <Image
          src={user.profile?.avatarUrl || '/default-avatar.png'}
          alt={user.name || ''}
          className="object-cover border border-gray-200"
          width={360}
          height={360}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-3">
        <h2 className="text-xl text-gray-800 font-bold mb-1 w-full text-center truncate">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-2 w-full text-center">{user.profile?.age}歳</p>
        <p className="text-sm text-gray-600 w-full text-center line-clamp-2 break-words">{trimmedIntroduction}</p>
      </div>
    </div>
  );
}