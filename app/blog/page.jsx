import Link from "next/link";
import { posts } from "@/data/posts";

export const metadata = { title: "Blog — Flora" };

export default function Blog() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-8 pb-24 pt-36 sm:px-14">
      <h1 className="font-display text-6xl leading-none">Blog</h1>
      <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group block py-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white">
              <p className="text-[11px] text-white/50">{p.date}</p>
              <h2 className="mt-2 text-xl font-medium group-hover:underline">{p.title}</h2>
              <p className="mt-2 max-w-xl text-sm text-white/65">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
