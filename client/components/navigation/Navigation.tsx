'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '@/components/icons/HomeIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import UserIcon from '@/components/icons/UserIcon';

export default function Navigation() {
  const pathname = usePathname();
  const navs = [
    { href: "/", label: "ホーム", icon: HomeIcon },
    { href: "/likes", label: "いいね", icon: HeartIcon },
    { href: "/talks", label: "トーク", icon: ChatIcon },
    { href: "/account", label: "アカウント", icon: UserIcon },
  ];

  return (
    <nav className="bg-background border-t border-muted shadow flex justify-around items-center h-16 md:hidden">
      {navs.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center justify-center text-xs font-medium transition-colors w-full h-full ${
            pathname === href ? "text-primary" : "text-foreground/70 hover:text-primary"
          }`}
        >
          <Icon className="w-6 h-6" />
          <span className="mt-1">{label}</span>
        </Link>
      ))}
    </nav>
  );
}