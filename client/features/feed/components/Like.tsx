import { ThumbsUpIcon } from "@/components/icons";

export const Like = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <button
      className="bg-primary text-white"
      onClick={onClick}
    >
      <ThumbsUpIcon className="w-12 h-12" />
    </button>
  );
}