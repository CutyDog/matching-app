'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BackAction, NopeAction, LikeAction } from '@/components/slides';
import { CandidateCard } from '@/components/users';
import { useSwipeCandidates } from '@/hooks/useSwipeCandidates';

export default function Home() {
  const {
    // swiper,
    setSwiper,
    candidates,
    handleSendLike,
    handleSlideChange,
    isFetching,
  } = useSwipeCandidates({ pageSize: 10 });

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
                <CandidateCard edge={edge} />
              </SwiperSlide>
            ))}
            <div className="flex justify-between w-full">
              <BackAction />
              <NopeAction />
              <LikeAction onClick={handleSendLike} />
            </div>
          </Swiper>
          {isFetching && <div className="text-center mt-2">Loading more...</div>}
        </div>
      </div>
    </div>
  );
}