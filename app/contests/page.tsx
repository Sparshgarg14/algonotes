import { getAllContests } from "@/lib/mdx";
import { ContestCard }   from "@/components/ContestCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contest Logs" };

export default function ContestsPage() {
  const contests = getAllContests();
  return (
    <div className="px-6 md:px-16 py-12 max-w-5xl">
      <h1 className="font-display text-4xl font-semibold mb-2">Contest Logs</h1>
      <p className="text-ink-secondary mb-8">{contests.length} post-mortems</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contests.map((c) => <ContestCard key={c.slug} contest={c} />)}
      </div>
    </div>
  );
}
