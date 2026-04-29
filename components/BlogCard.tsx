import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function BlogCard({ post: p }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="block bg-bg-secondary border border-line rounded-xl p-5 hover:border-acc-purple/40 transition-colors group"
    >
      <div className="flex items-center gap-2 text-xs text-ink-muted mb-3">
        <span className="font-mono">{p.date}</span>
        <span>·</span>
        <span>{p.readingTime}</span>
      </div>
      <h3 className="font-medium text-sm mb-2 group-hover:text-acc-purple transition-colors leading-snug">
        {p.title}
      </h3>
      <p className="text-xs text-ink-muted line-clamp-2">{p.excerpt}</p>
    </Link>
  );
}
