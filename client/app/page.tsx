'use client';

import { useSwipeFeed } from '@/features/feed/hooks';
import { UserList, MatchingPopup } from '@/features/feed/components';

export default function Home() {
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
  });

  return (
    <>
      <UserList
        candidates={candidates}
        setSwiper={setSwiper}
        handleSendLike={handleSendLike}
        handleSlideChange={handleSlideChange}
        isFetching={isFetching}
        emptyMessage="まだユーザーがいません"
      />
      <MatchingPopup
        showMatchedPopup={showMatchedPopup}
        setShowMatchedPopup={setShowMatchedPopup}
        handleStartChat={handleStartChat}
      />
    </>
  );
}