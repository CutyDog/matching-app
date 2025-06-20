'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Talks", href: "/talks" },
  { label: "Likes", href: "/likes" },
  { label: "Account", href: "/account" },
];

const Navigation = () => {
  const pathname = usePathname()

  return (
    <footer>
      <div className="flex items-center justify-between text-sm font-bold">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`py-3 text-center w-full bg-black ${pathname === item.href ? "text-white" : "text-gray-500"}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default Navigation;