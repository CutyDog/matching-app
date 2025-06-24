'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BackAction, NopeAction, LikeAction } from '@/components/slides';
import { CandidateCard } from '@/components/users';
import { useSwipeCandidates } from '@/hooks/useSwipeCandidates';
import { HeartPinkIcon } from '@/components/icons';

export default function Home() {
  const {
    setSwiper,
    candidates,
    handleSendLike,
    handleSlideChange,
    isFetching,
    showMatchedPopup,
    setShowMatchedPopup,
    handleStartChat,
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
        <div className="px-4 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full flex flex-col items-center relative animate-zoom-in">
            <div className="mb-4">
              <HeartPinkIcon />
            </div>
            <h2 className="text-3xl font-extrabold text-pink-500 mb-2">マッチング成立！</h2>
            <p className="text-lg text-gray-700 mb-4">おめでとうございます！<br />新しいトークを始めましょう。</p>
            <button
              onClick={handleStartChat}
              className="mt-2 px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow hover:bg-pink-600 transition"
            >
              トークをはじめる
            </button>
            <button
              onClick={() => setShowMatchedPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}