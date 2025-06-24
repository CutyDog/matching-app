'use client';

import { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { UserEdge, Like, PageInfo } from '@/graphql/graphql';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import { BackAction, NopeAction, LikeAction } from '@/components/slides';

const CANDIDATES_QUERY = gql`
  query Candidates($first: Int, $after: String) {
    candidates(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          name
          profile {
            avatarUrl
            age
            introduction
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const SEND_LIKE_MUTATION = gql`
  mutation SendLike($receiverId: ID!) {
    sendLike(input: { receiverId: $receiverId }) {
      like {
        id
      }
    }
  }
`;

export default function Home() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const { data } = useQuery<{ candidates: { edges: UserEdge[], pageInfo: PageInfo } }>(CANDIDATES_QUERY, {
    variables: {
      first: 10,
      after,
    },
  });
  const [sendLike] = useMutation<{ sendLike: { like: Like } }>(SEND_LIKE_MUTATION);

  // useEffect(() => {
  //   if (data) {
  //     setAfter(data.candidates.pageInfo.endCursor || null);
  //   }
  // }, [data]);

  if (!data) return <div>Loading...</div>;

  const handleSendLike = () => {
    const candidate = data?.candidates.edges[swiper?.activeIndex || 0].node
    if (!candidate) return;
    sendLike({ variables: { receiverId: candidate.id } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light py-10 px-2 flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <div className="relative w-[340px] h-[480px]">
          <Swiper
            effect="stack"
            grabCursor={true}
            onSwiper={setSwiper}
            className="w-full"
          >
            {data.candidates.edges.map((edge) => (
              <>
                <SwiperSlide key={edge.node?.id}>
                  <div className="w-[320px] h-[460px] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-4 border border-gray-200">
                    <Image
                      src={edge.node?.profile?.avatarUrl || '/default-avatar.png'}
                      alt={edge.node?.name || ''}
                      className="rounded-full object-cover"
                      width={128}
                      height={128}
                    />
                    <h2 className="text-xl text-gray-500 font-bold mb-2">{edge.node?.name}</h2>
                    <p className="text-sm text-gray-500">{edge.node?.profile?.age}歳</p>
                    {/* 他のプロフィール情報もここに追加可能 */}
                  </div>
                </SwiperSlide>
              </>
            ))}
            <div className="flex justify-between w-full">
              <BackAction />
              <NopeAction />
              <LikeAction onClick={handleSendLike} />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}