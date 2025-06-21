import Image from 'next/image';

export default function AvatarImage({
  avatarUrl,
  size = 100,
  onClick,
}: {
  avatarUrl: string;
  size?: number;
  onClick?: () => void;
}) {
  return (
    <Image
      src={avatarUrl}
      alt="avatar"
      width={size}
      height={size}
      className="rounded-xl"
      onClick={onClick}
    />
  )
}