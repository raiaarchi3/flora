"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-7 sm:px-14">
      <Link href="/" className="text-sm font-semibold">Flora</Link>
      <nav className="flex gap-6 text-[11px] font-medium" aria-label="Main">
        <Link href="/" aria-current="page" className="border-b border-white px-1 pb-1.5 text-white">
          Species
        </Link>
        <button
          onClick={() => window.dispatchEvent(new Event("flora:browse"))}
          className="px-1 pb-1.5 text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
        >
          Browse
        </button>
      </nav>
    </header>
  );
}