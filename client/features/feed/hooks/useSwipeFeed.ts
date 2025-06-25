import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import { UserEdge, User } from '@/graphql/graphql';
import {
  useGetCandidates,
  useSendLike,
  useAcceptLike,
  useStartChat,
} from '../api';

type SwipeFeedProps = {
  pageSize?: number;
  scope?: 'active' | 'passive' | 'matched';
}

export const useSwipeFeed = ({ pageSize = 10, scope }: SwipeFeedProps) => {
  const router = useRouter();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [candidates, setCandidates] = useState<UserEdge[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showMatchedPopup, setShowMatchedPopup] = useState<boolean>(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);

  const getCandidatesVariables = useMemo(() => {
    return {
      first: pageSize,
      activeLikes: scope === 'active',
      passiveLikes: scope === 'passive',
      matchedLikes: scope === 'matched',
    }
  }, [pageSize, scope]);

  const { data, fetchMore } = useGetCandidates({ after: null, ...getCandidatesVariables});
  const [acceptLike] = useAcceptLike();
  const [sendLike] = useSendLike();
  const [startChat] = useStartChat();

  useEffect(() => {
    if (!data) return;
    setCandidates(data.candidates.edges);
    setEndCursor(data.candidates.pageInfo.endCursor || null);
    setHasNextPage(data.candidates.pageInfo.hasNextPage);
  }, [data]);

  const handleSendLike = useCallback(async () => {
    if (!swiper) return;
    const idx = swiper.activeIndex;
    const candidate = candidates[idx]?.node;
    if (!candidate) return;
    try {
      if (candidate.likesMe) {
        await acceptLike({ variables: { senderId: candidate.id } });
        setShowMatchedPopup(true);
        setMatchedUser(candidate);
      } else {
        await sendLike({ variables: { receiverId: candidate.id } });
      }
      setCandidates((prev) => prev.filter((_, i) => i !== idx));
    } catch (error) {
      // エラー処理
      console.error('Failed to send like:', error);
    }
  }, [swiper, candidates, sendLike, acceptLike]);

  const handleStartChat = useCallback(async () => {
    if (!matchedUser) return;
    const result = await startChat({ variables: { memberId: matchedUser.id } });
    setShowMatchedPopup(false);
    router.push(`/talks/${result.data?.startChat.chatRoom.id}`);
  }, [matchedUser, startChat, router]);

  const fetchMoreCandidates = useCallback(async () => {
    if (!endCursor || isFetching || !hasNextPage) return;
    setIsFetching(true);
    try {
      const result = await fetchMore({
        variables: {
          ...getCandidatesVariables,
          after: endCursor,
        },
      });
      const newEdges = result.data?.candidates.edges || [];
      const newPageInfo = result.data?.candidates.pageInfo;
      setCandidates((prev) => [...prev, ...newEdges]);
      setEndCursor(newPageInfo?.endCursor || null);
      setHasNextPage(newPageInfo?.hasNextPage || false);
    } finally {
      setIsFetching(false);
    }
  }, [endCursor, getCandidatesVariables, isFetching, hasNextPage, fetchMore]);

  const handleSlideChange = useCallback(() => {
    if (!swiper) return;
    const idx = swiper.activeIndex;
    const currentEdge = candidates[idx];
    if (currentEdge && currentEdge.cursor === endCursor) {
      fetchMoreCandidates();
    }
  }, [swiper, candidates, endCursor, fetchMoreCandidates]);

  return {
    swiper,
    setSwiper,
    candidates,
    setCandidates,
    endCursor,
    setEndCursor,
    hasNextPage,
    setHasNextPage,
    isFetching,
    showMatchedPopup,
    setShowMatchedPopup,
    matchedUser,
    setMatchedUser,
    handleSendLike,
    handleStartChat,
    handleSlideChange,
  }
}