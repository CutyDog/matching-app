import { ThumbsUpIcon } from "@/components/icons";

export const Like = ({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className="bg-primary text-white"
      onClick={onClick}
      disabled={disabled}
    >
      <ThumbsUpIcon className={`w-12 h-12 ${disabled ? 'opacity-50' : ''}`} />
    </button>
  );
}