import Link from "next/link";
import type { Solution } from "@/lib/types";
import { Tag }             from "./Tag";
import { DifficultyBadge } from "./DifficultyBadge";
import { PlatformBadge }   from "./PlatformBadge";

export function SolutionCard({ solution: s }: { solution: Solution }) {
  return (
    <Link
      href={`/solutions/${s.slug}`}
      className="block bg-bg-secondary border border-line rounded-xl p-4 hover:border-acc-purple/40 transition-colors group"
    >
      <div className="flex gap-2 mb-3">
        <PlatformBadge platform={s.platform} />
        <DifficultyBadge difficulty={s.difficulty} />
      </div>
      <h3 className="font-medium text-sm mb-2 group-hover:text-acc-purple transition-colors leading-snug">
        {s.title}
      </h3>
      <p className="text-xs text-ink-muted line-clamp-2 mb-3">{s.excerpt}</p>
      <div className="flex flex-wrap gap-1">
        {s.tags.slice(0, 3).map((t) => (
          <Tag key={t} tag={t} />
        ))}
      </div>
    </Link>
  );
}
