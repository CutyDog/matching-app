import { useSwiper } from "swiper/react";
import { ForwardIcon } from "@/components/icons";

export const Forward = () => {
  const swiper = useSwiper();
  const handleClick = () => {
    swiper.slideNext();
  };

  return (
    <button className="bg-primary text-white" onClick={handleClick}>
      <ForwardIcon className="w-12 h-12" />
    </button>
  );
}