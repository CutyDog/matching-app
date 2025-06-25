'use client'

import { HeaderTabs } from '@/components/layouts';

export default function LikesLayout({ children }: { children: React.ReactNode }) {
  const navs = [
    { href: "/likes/sent", label: '自分から' },
    { href: "/likes/received", label: '相手から' },
    { href: "/likes/matched", label: 'マッチング' },
  ];

  return (
    <>
      <HeaderTabs navs={navs} />
      {children}
    </>
  );
}