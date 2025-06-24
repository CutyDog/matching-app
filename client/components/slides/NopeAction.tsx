import { useSwiper } from "swiper/react";
import { ThumbsDownIcon } from "../icons";

export default function NopeAction({
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
      <ThumbsDownIcon className="w-6 h-6" />
    </button>
  );
}