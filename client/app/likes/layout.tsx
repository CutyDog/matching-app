'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LikesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navs = [
    { href: "/likes/sent", label: '自分から' },
    { href: "/likes/received", label: '相手から' },
    { href: "/likes/matched", label: 'マッチング' },
  ];

  return (
    <>
      <div className="max-w-2xl mx-auto px-2 min-h-screen">
        <div className="flex w-full border-muted shadow justify-around items-center h-16 mb-4">
          <div className="text-sm font-medium text-center border-b border-gray-200 w-full">
            <ul className="flex flex-wrap -mb-px">
              {navs.map(({ href, label }) => (
                <li
                  key={href}
                  className={`me-2 inline-block p-4 border-b-2 border-transparent cursor-pointer ${
                    href === pathname ? 'text-foreground border-primary' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <Link
                    key={href}
                    href={href}
                  >
                    <span className="mt-1">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-2">
          {children}
        </div>
      </div>
    </>
  );
}