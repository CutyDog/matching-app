import { useState, useEffect, useCallback } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import { useQuery, useMutation, gql } from '@apollo/client';
import { UserEdge, PageInfo, Like } from '@/graphql/graphql';

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
        }
      }
      pageInfo {
        hasNextPage
        endCursor
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
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [candidates, setCandidates] = useState<UserEdge[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const [sendLike] = useMutation<{ sendLike: { like: Like } }>(SEND_LIKE_MUTATION);
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
      await sendLike({ variables: { receiverId: candidate.id } });
      setCandidates((prev) => prev.filter((_, i) => i !== idx));
    } catch (error) {
      // エラー処理
      console.error('Failed to send like:', error);
    }
  }, [swiper, candidates, sendLike]);

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
  };
}