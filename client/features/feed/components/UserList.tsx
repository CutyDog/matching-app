'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CandidateCard } from "@/components/users";
import { Like } from "./Like";
import { BackForward } from "./BackForward";
import { Forward } from "./Forward";
import { UserEdge } from "@/graphql/graphql";
import { Swiper as SwiperType } from "swiper/types";

type UserListProps = {
  candidates: UserEdge[];
  setSwiper: (swiper: SwiperType) => void;
  handleSlideChange: () => void;
  isFetching: boolean;
  handleSendLike: () => void;
  emptyMessage: string;
  disableLike?: boolean;
}

export const UserList = ({
  candidates,
  setSwiper,
  handleSlideChange,
  isFetching,
  handleSendLike,
  emptyMessage,
  disableLike = false,
}: UserListProps) => {

  if(candidates.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light flex flex-col items-center justify-center py-10 px-2">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-center text-2xl font-bold">{emptyMessage}</p>
        </div>
      </div>
    )
  }

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
              <BackForward />
              <Like onClick={handleSendLike} disabled={isFetching || disableLike} />
              <Forward />
            </div>
          </Swiper>
          {isFetching && <div className="text-center mt-2">Loading more...</div>}
        </div>
      </div>
    </>
  );
}