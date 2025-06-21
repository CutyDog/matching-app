import Image from 'next/image';

export default function AvatarImage({
  avatarUrl,
  size = 100,
  onClick,
  label,
  isUploading,
}: {
  avatarUrl: string;
  size?: number;
  onClick?: () => void;
  label?: string;
  isUploading?: boolean;
}) {
  const wrapperClasses = label ? "relative cursor-pointer group" : "relative";

  return (
    <div
      className={wrapperClasses}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <Image
        src={avatarUrl}
        alt="avatar"
        width={size}
        height={size}
        className="rounded-xl object-cover"
      />
      {label && (
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black rounded-b-2xl">
          <p className="text-white text-center">{label}</p>
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  )
}