import { useSwiper } from "swiper/react";
import { ThumbsDownIcon } from "../icons";

export default function NopeAction({
  onClick,
  iconSize = 'w-6 h-6',
}: {
  onClick?: () => void;
  iconSize?: string;
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
      <ThumbsDownIcon className={iconSize} />
    </button>
  );
}