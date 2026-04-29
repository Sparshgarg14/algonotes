import { getAllSolutions } from "@/lib/mdx";
import { SolutionCard }    from "@/components/SolutionCard";
import { TagFilterBar }    from "@/components/TagFilterBar";
import type { Metadata }   from "next";

export const metadata: Metadata = { title: "Solutions" };

interface Props {
  searchParams: { tag?: string; platform?: string; difficulty?: string };
}

export default function SolutionsPage({ searchParams }: Props) {
  let solutions = getAllSolutions();

  // filter — extend this as needed (no rearchitecting required)
  if (searchParams.tag)
    solutions = solutions.filter((s) => s.tags.includes(searchParams.tag!));
  if (searchParams.platform)
    solutions = solutions.filter((s) => s.platform === searchParams.platform);
  if (searchParams.difficulty)
    solutions = solutions.filter((s) => s.difficulty === searchParams.difficulty);

  const allTags = [...new Set(getAllSolutions().flatMap((s) => s.tags))];

  return (
    <div className="px-6 md:px-16 py-12 max-w-5xl">
      <h1 className="font-display text-4xl font-semibold mb-2">Solutions</h1>
      <p className="text-ink-secondary mb-8">
        {solutions.length} solution{solutions.length !== 1 ? "s" : ""} · LeetCode & Codeforces
      </p>

      <TagFilterBar
        tags={allTags}
        platforms={["leetcode", "codeforces", "atcoder"]}
        difficulties={["easy", "medium", "hard"]}
        active={searchParams}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {solutions.map((s) => <SolutionCard key={s.slug} solution={s} />)}
      </div>

      {solutions.length === 0 && (
        <p className="text-ink-muted mt-12 text-center">No solutions found for these filters.</p>
      )}
    </div>
  );
}
