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

const PAGE_SIZE = 10;

export default function Home() {
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [candidates, setCandidates] = useState<UserEdge[]>([]);

  const { data, fetchMore } = useQuery<{ candidates: { edges: UserEdge[], pageInfo: PageInfo } }>(CANDIDATES_QUERY, {
    variables: {
      first: PAGE_SIZE,
      after: null,
    },
  });
  const [sendLike] = useMutation<{ sendLike: { like: Like } }>(SEND_LIKE_MUTATION);

  useEffect(() => {
    if (data) {
      setCandidates(data.candidates.edges);
      setEndCursor(data.candidates.pageInfo.endCursor || null);
      setHasNextPage(data.candidates.pageInfo.hasNextPage);
    }
  }, [data, setCandidates, setEndCursor]);

  if (!data) return <div>Loading...</div>;

  const handleSendLike = async () => {
    if (!swiper) return;
    const idx = swiper.activeIndex;
    const candidate = candidates[idx]?.node;
    if (!candidate) return;

    await sendLike({ variables: { receiverId: candidate.id } });

    const updated = candidates.filter((_, i) => i !== idx);
    setCandidates(updated);
  };

  const handleSlideChange = async () => {
    if (!swiper) return;
    const idx = swiper.activeIndex;
    // 最後のカードだった && 次ページがある場合は fetchMore
    const isLast = idx >= candidates.length - 1;

    if (isLast && hasNextPage && endCursor) {
      const result = await fetchMore({
        variables: {
          first: PAGE_SIZE,
          after: endCursor,
        },
      });

      const newEdges = result.data?.candidates.edges || [];
      const newPageInfo = result.data?.candidates.pageInfo;

      setCandidates((prev) => [...prev, ...newEdges]);
      setEndCursor(newPageInfo?.endCursor || null);
      setHasNextPage(newPageInfo?.hasNextPage || false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light py-10 px-2 flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <div className="relative w-[340px] h-[480px]">
          <Swiper
            effect="stack"
            grabCursor={true}
            onSwiper={setSwiper}
            onSlideChange={handleSlideChange}
            className="w-full"
          >
            {candidates.map((edge) => (
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