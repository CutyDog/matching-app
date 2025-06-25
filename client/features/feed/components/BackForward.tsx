import { useSwiper } from "swiper/react";
import { BackForwardIcon } from "@/components/icons";

export const BackForward = () => {
  const swiper = useSwiper();
  const handleClick = () => {
    swiper.slidePrev();
  }

  return (
    <button className="bg-primary text-white" onClick={handleClick}>
      <BackForwardIcon className="w-12 h-12" />
    </button>
  )
}