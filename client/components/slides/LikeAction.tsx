import { ThumbsUpIcon } from "../icons";

export default function LikeAction({
  onClick,
  iconSize = 'w-6 h-6',
}: {
  onClick?: () => void;
  iconSize?: string;
}) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      className="bg-primary text-white"
      onClick={handleClick}
    >
      <ThumbsUpIcon className={iconSize} />
    </button>
  );
}