import { getAllTricks } from "@/lib/mdx";
import { TrickCard }   from "@/components/TrickCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trick Articles" };

export default function TricksPage() {
  const tricks = getAllTricks();
  return (
    <div className="px-6 md:px-16 py-12 max-w-5xl">
      <h1 className="font-display text-4xl font-semibold mb-2">Trick Articles</h1>
      <p className="text-ink-secondary mb-8">{tricks.length} in-depth technique writeups</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tricks.map((t) => <TrickCard key={t.slug} trick={t} />)}
      </div>
    </div>
  );
}
