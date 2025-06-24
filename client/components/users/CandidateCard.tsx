import Image from 'next/image';
import { UserEdge } from '@/graphql/graphql';

export default function CandidateCard({ edge }: { edge: UserEdge }) {
  const user = edge.node;
  return (
    <div className="w-[320px] h-[460px] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-4 border border-gray-200">
      <Image
        src={user?.profile?.avatarUrl || '/default-avatar.png'}
        alt={user?.name || ''}
        className="rounded-full object-cover"
        width={128}
        height={128}
      />
      <h2 className="text-xl text-gray-500 font-bold mb-2">{user?.name}</h2>
      <p className="text-sm text-gray-500">{user?.profile?.age}歳</p>
      {/* 他のプロフィール情報もここに追加可能 */}
    </div>
  );
}