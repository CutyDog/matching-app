import { useSwiper } from "swiper/react";
import { ThumbsUpIcon } from "../icons";

export default function LikeAction({
  onClick,
}: {
  onClick?: () => void;
}) {
  const swiper = useSwiper();
  const handleClick = () => {
    if (onClick) onClick();
    swiper.slideNext();
  };

  return (
    <button
      className="bg-primary text-white"
      onClick={handleClick}
    >
      <ThumbsUpIcon className="w-6 h-6" />
    </button>
  );
}