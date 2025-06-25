'use client'

import { useSwipeFeed } from '@/features/feed/hooks';
import { UserList, MatchingPopup } from '@/features/feed/components';

export default function SentLikesPage() {
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
    scope: 'active',
  });

  return (
    <>
      <UserList
        candidates={candidates}
        setSwiper={setSwiper}
        handleSendLike={handleSendLike}
        handleSlideChange={handleSlideChange}
        isFetching={isFetching}
        emptyMessage="まだいいねを送っていません"
        disableLike={true}
      />
      <MatchingPopup
        showMatchedPopup={showMatchedPopup}
        setShowMatchedPopup={setShowMatchedPopup}
        handleStartChat={handleStartChat}
      />
    </>
  );
}