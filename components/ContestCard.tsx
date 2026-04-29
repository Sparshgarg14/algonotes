import Link from "next/link";
import type { ContestLog } from "@/lib/types";

export function ContestCard({ contest: c }: { contest: ContestLog }) {
  return (
    <Link
      href={`/contests/${c.slug}`}
      className="block bg-bg-secondary border border-line rounded-xl p-4 hover:border-acc-amber/40 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-acc-amber/10 text-acc-amber uppercase">
          {c.platform}
        </span>
        {c.ratingChange !== undefined && (
          <span
            className={`text-xs font-mono font-semibold ${
              c.ratingChange >= 0 ? "text-acc-teal" : "text-acc-red"
            }`}
          >
            {c.ratingChange >= 0 ? "+" : ""}
            {c.ratingChange}
          </span>
        )}
      </div>

      <h3 className="font-medium text-sm mb-1">{c.round}</h3>

      {c.rank && (
        <p className="text-xs text-ink-muted mb-3">
          Rank {c.rank}
          {c.totalRank ? ` / ${c.totalRank.toLocaleString()}` : ""}
        </p>
      )}

      <div className="flex gap-1.5 mt-3">
        {c.problems.map((p) => (
          <div
            key={p.id}
            className={`flex flex-col items-center rounded px-2 py-1.5 border text-xs font-mono flex-1 ${
              p.solved
                ? "border-acc-teal/30 bg-acc-teal/5 text-acc-teal"
                : "border-line text-ink-muted"
            }`}
          >
            <span>{p.id}</span>
            <span className="mt-0.5 text-base leading-none">{p.solved ? "✓" : "–"}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}
