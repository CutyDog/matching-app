'use client'

import { useSwipeFeed } from '@/features/feed/hooks';
import { CandidateList, MatchingPopup } from '@/features/feed/components';

export default function MatchedLikesPage() {
  const {
    candidates,
    setSwiper,
    handleSendLike,
    handleSlideChange,
    isFetching,
    showMatchedPopup,
    setShowMatchedPopup,
    handleStartChat,
  } = useSwipeFeed({
    pageSize: 10,
    passiveLikes: false,
  });

  return (
    <>
      <CandidateList
        candidates={candidates}
        setSwiper={setSwiper}
        handleSendLike={handleSendLike}
        handleSlideChange={handleSlideChange}
        isFetching={isFetching}
      />
      <MatchingPopup
        showMatchedPopup={showMatchedPopup}
        setShowMatchedPopup={setShowMatchedPopup}
        handleStartChat={handleStartChat}
      />
    </>
  );
}