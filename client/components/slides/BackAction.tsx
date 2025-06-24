import { useSwiper } from "swiper/react";
import { BackForwardIcon } from "../icons";

export default function BackAction({
  onClick,
  iconSize = 'w-6 h-6',
}: {
  onClick?: () => void;
  iconSize?: string;
}) {
  const swiper = useSwiper();
  const handleClick = () => {
    if (onClick) onClick();
    swiper.slidePrev();
  };

  return (
    <button
      className="bg-primary text-white"
      onClick={handleClick}
    >
      <BackForwardIcon className={iconSize} />
    </button>
  );
}