'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Nav = { href: string; label: string };
interface HeaderTabsProps {
  navs: Nav[];
}

export const HeaderTabs = ({ navs }: HeaderTabsProps) => {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 z-20 w-full border-muted shadow h-16 mb-4">
      <div className="flex w-full justify-center items-center h-full">
        <ul className="flex justify-center items-center h-full">
          {navs.map(({ href, label }) => (
            <li
              key={href}
              className={`font-medium text-center me-2 p-4 border-b-2 border-transparent cursor-pointer ${
                href === pathname ? 'text-foreground border-primary' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};