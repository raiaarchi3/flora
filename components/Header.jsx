"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Species" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const path = usePathname();
  const isActive = (href) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-8 py-7 sm:px-14">
      <Link href="/" className="text-sm font-semibold">Flora</Link>
      <nav className="flex gap-6 text-[11px] font-medium" aria-label="Main">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`px-1 pb-1.5 transition hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white ${
              isActive(l.href) ? "border-b border-white text-white" : "text-white/70"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
