import Link from "next/link";
import type { TrickArticle } from "@/lib/types";

const TRICK_ICONS: Record<string, string> = {
  "Binary Search":   "⚡",
  "Graph":           "🌐",
  "DP":              "🧩",
  "Data Structures": "🌲",
  "Math":            "∑",
  "String":          "🔤",
};

export function TrickCard({ trick: t }: { trick: TrickArticle }) {
  return (
    <Link
      href={`/tricks/${t.slug}`}
      className="block bg-bg-secondary border border-line rounded-xl p-4 hover:border-acc-teal/40 transition-colors group"
    >
      <span className="text-xl mb-3 block">{TRICK_ICONS[t.category] ?? "📌"}</span>
      <h3 className="font-medium text-sm mb-2 group-hover:text-acc-teal transition-colors leading-snug">
        {t.title}
      </h3>
      <p className="text-xs text-ink-muted line-clamp-3 mb-3">{t.excerpt}</p>
      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <span className="font-mono">{t.category}</span>
        <span>·</span>
        <span>{t.readingTime}</span>
      </div>
    </Link>
  );
}
