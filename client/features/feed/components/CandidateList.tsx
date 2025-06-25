'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CandidateCard } from "@/components/users";
import { Like } from "./Like";
import { BackForward } from "./BackForward";
import { Forward } from "./Forward";
import { UserEdge } from "@/graphql/graphql";
import { Swiper as SwiperType } from "swiper/types";

export const CandidateList = ({
  candidates,
  setSwiper,
  handleSlideChange,
  isFetching,
  handleSendLike,
}: {
  candidates: UserEdge[];
  setSwiper: (swiper: SwiperType) => void;
  handleSlideChange: () => void;
  isFetching: boolean;
  handleSendLike: () => void;
}) => {

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
              <Like onClick={handleSendLike} />
              <Forward />
            </div>
          </Swiper>
          {isFetching && <div className="text-center mt-2">Loading more...</div>}
        </div>
      </div>
    </>
  );
}