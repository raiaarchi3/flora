import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function Post({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-8 pb-24 pt-36 sm:px-14">
      <Link href="/blog" className="text-xs text-white/60 hover:text-white">Back to blog</Link>
      <p className="mt-10 text-[11px] text-white/50">{post.date}</p>
      <h1 className="mt-3 font-display text-5xl leading-tight">{post.title}</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-white/75">
        {post.body.map((para) => <p key={para}>{para}</p>)}
      </div>
    </main>
  );
}
