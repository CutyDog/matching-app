import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import { useQuery, useMutation, gql } from '@apollo/client';
import { UserEdge, User, PageInfo, Like, ChatRoom } from '@/graphql/graphql';

const SEND_LIKE_MUTATION = gql`
  mutation SendLike($receiverId: ID!) {
    sendLike(input: { receiverId: $receiverId }) {
      like {
        id
      }
    }
  }
`;

const ACCEPT_LIKE_MUTATION = gql`
  mutation AcceptLike($senderId: ID!) {
    acceptLike(input: { senderId: $senderId }) {
      like {
        id
      }
    }
  }
`;

const PAGE_SIZE = 10;

const CANDIDATES_QUERY = gql`
  query Candidates($first: Int, $after: String, $passiveLikes: Boolean) {
    candidates(first: $first, after: $after, passiveLikes: $passiveLikes) {
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
          likesMe
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const START_CHAT_MUTATION = gql`
  mutation StartChat($memberId: ID!) {
    startChat(input: { memberId: $memberId }) {
      chatRoom {
        id
      }
    }
  }
`;

export const useSwipeCandidates = ({
  passiveLikes = false,
  pageSize = PAGE_SIZE,
}: {
  passiveLikes?: boolean;
  pageSize?: number;
}) => {
  const router = useRouter();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [candidates, setCandidates] = useState<UserEdge[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showMatchedPopup, setShowMatchedPopup] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [sendLike] = useMutation<{ sendLike: { like: Like } }>(SEND_LIKE_MUTATION);
  const [acceptLike] = useMutation<{ acceptLike: { like: Like } }>(ACCEPT_LIKE_MUTATION);
  const [startChat] = useMutation<{ startChat: { chatRoom: ChatRoom } }>(START_CHAT_MUTATION);
  const { data, fetchMore } = useQuery<{ candidates: { edges: UserEdge[]; pageInfo: PageInfo } }>(CANDIDATES_QUERY, {
    variables: { first: pageSize, after: null, passiveLikes },
  });

  useEffect(() => {
    if (data) {
      setCandidates(data.candidates.edges);
      setEndCursor(data.candidates.pageInfo.endCursor || null);
      setHasNextPage(data.candidates.pageInfo.hasNextPage);
    }
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
        variables: { first: pageSize, after: endCursor, passiveLikes },
      });
      const newEdges = result.data?.candidates.edges || [];
      const newPageInfo = result.data?.candidates.pageInfo;
      setCandidates((prev) => [...prev, ...newEdges]);
      setEndCursor(newPageInfo?.endCursor || null);
      setHasNextPage(newPageInfo?.hasNextPage || false);
    } finally {
      setIsFetching(false);
    }
  }, [pageSize, passiveLikes, endCursor, isFetching, hasNextPage, fetchMore]);

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
    handleSendLike,
    handleSlideChange,
    isFetching,
    showMatchedPopup,
    setShowMatchedPopup,
    matchedUser,
    setMatchedUser,
    handleStartChat,
  };
}