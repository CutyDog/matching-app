import { AvatarImage } from "../images";
import { User } from "@/graphql/graphql";

export default function LikeCard({
  user,
  message,
  date,
}: {
  user: User;
  message: string;
  date: string;
}) {
  const avatarUrl = user.profile?.avatarUrl || '/default-avatar.png';

  return (
    <div className="flex flex-col items-center rounded-xl shadow p-3">
      <AvatarImage avatarUrl={avatarUrl} size={64} />
      <div className="mt-2 font-semibold text-center truncate w-full">{user.name}</div>
      <div className="text-xs text-gray-500 text-center w-full truncate">{message}</div>
      <div className="text-xs text-gray-400 mt-1">{date}</div>
    </div>
  );
}