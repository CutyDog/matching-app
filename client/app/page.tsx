'use client';

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { User } from '@/graphql/graphql';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CANDIDATES_QUERY = gql`
  query Candidates($first: Int, $after: String) {
    candidates(first: $first, after: $after) {
      nodes {
        id
        name
        profile {
          avatarUrl
          age
          introduction
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default function Home() {
  const [after, setAfter] = useState<string | null>(null);
  const { data } = useQuery<{ candidates: { nodes: User[] } }>(CANDIDATES_QUERY, {
    variables: {
      first: 10,
      after,
    },
  });

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light py-10 px-2 flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <div className="relative w-[340px] h-[480px]">
          <Swiper
            effect="stack"
            grabCursor={true}
            className="w-full h-full"
          >
            {data.candidates.nodes.map((user) => (
              <SwiperSlide key={user.id}>
                <div className="w-[320px] h-[460px] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-4 border border-gray-200">
                  <Image
                    src={user.profile?.avatarUrl || '/default-avatar.png'}
                    alt={user.name}
                    className="rounded-full object-cover"
                    width={128}
                    height={128}
                  />
                  <h2 className="text-xl text-gray-500 font-bold mb-2">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.profile?.age}歳</p>
                  {/* 他のプロフィール情報もここに追加可能 */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}