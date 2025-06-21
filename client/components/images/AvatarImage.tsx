import Image from 'next/image';

export default function AvatarImage({
  avatarUrl,
  size = 100,
}: {
  avatarUrl: string;
  size?: number;
}) {
  return (
    <Image
      src={avatarUrl}
      alt="avatar"
      width={size}
      height={size}
      className="rounded-xl"
    />
  )
}