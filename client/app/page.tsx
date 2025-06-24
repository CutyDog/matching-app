'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BackAction, NopeAction, LikeAction } from '@/components/slides';
import { CandidateCard } from '@/components/users';
import { useSwipeCandidates } from '@/hooks/useSwipeCandidates';

export default function Home() {
  const {
    setSwiper,
    candidates,
    handleSendLike,
    handleSlideChange,
    isFetching,
    showMatchedPopup,
    setShowMatchedPopup,
  } = useSwipeCandidates({
    pageSize: 10
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light flex flex-col items-center justify-center py-10 px-2">
        <div className="w-full flex flex-col items-center justify-center">
          <Swiper
            effect="stack"
            grabCursor={true}
            onSwiper={setSwiper}
            onSlideChange={handleSlideChange}
            className="w-full flex flex-col items-center"
          >
            {candidates.map((edge) => {
              if(!edge.node) return;
              return (
                <SwiperSlide key={edge.node.id}>
                  <div className="flex flex-col items-center justify-center min-h-[600px]">
                    <CandidateCard user={edge.node} />
                  </div>
                </SwiperSlide>
              )
            })}
            <div className="flex flex-row items-center justify-center gap-14 w-full">
              <BackAction iconSize="w-12 h-12" />
              <LikeAction onClick={handleSendLike} iconSize="w-12 h-12" />
              <NopeAction iconSize="w-12 h-12" />
            </div>
          </Swiper>
          {isFetching && <div className="text-center mt-2">Loading more...</div>}
        </div>
      </div>

      {showMatchedPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">マッチング成立！</h2>
            <p>おめでとうございます！</p>
            <button onClick={() => setShowMatchedPopup(false)} className="mt-4 btn-primary">閉じる</button>
          </div>
        </div>
      )}
    </>
  );
}