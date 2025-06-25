'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, HeartIcon, ChatIcon, UserIcon } from '@/components/icons';

export const Navigation = () => {
  const pathname = usePathname();
  const navs = [
    { href: "/", label: "ホーム", icon: HomeIcon },
    { href: "/likes/sent", label: "いいね", icon: HeartIcon },
    { href: "/talks", label: "トーク", icon: ChatIcon },
    { href: "/account", label: "アカウント", icon: UserIcon },
  ];

  return (
    <nav className="bg-background border-t border-muted shadow flex justify-around items-center h-16 md:hidden">
      {navs.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href.startsWith("/likes/") && pathname.startsWith("/likes/"));
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center text-xs font-medium transition-colors w-full h-full ${
              isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="mt-1">{label}</span>
          </Link>
        )
      })}
    </nav>
  );
}