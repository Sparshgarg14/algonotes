import { getSolution, getAllSolutions } from "@/lib/mdx";
import { MDXContent }      from "@/components/MDXContent";
import { Tag }             from "@/components/Tag";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { PlatformBadge }   from "@/components/PlatformBadge";
import { ViewCount }       from "@/components/ViewCount";
import { notFound }        from "next/navigation";
import type { Metadata }   from "next";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getSolution(slug);
    return { title: meta.title, description: meta.excerpt };
  } catch {
    return { title: "Solution Not Found" };
  }
}

export function generateStaticParams() {
  return getAllSolutions().map((s) => ({ slug: s.slug }));
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;

  let data;
  try {
    data = getSolution(slug);
  } catch {
    notFound();
  }

  const { meta, content } = data!;

  return (
    <article className="px-6 md:px-16 py-12 max-w-3xl">
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <PlatformBadge platform={meta.platform} />
          <DifficultyBadge difficulty={meta.difficulty} />
          {meta.contestRound && (
            <span className="text-xs px-2 py-0.5 rounded bg-acc-amber/10 text-acc-amber font-mono">
              {meta.contestRound}
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl font-semibold mb-3">{meta.title}</h1>
        <p className="text-ink-secondary mb-4">{meta.excerpt}</p>
        <div className="mb-4">
          <ViewCount slug={slug} />
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-mono text-ink-muted mb-4">
          <span>⏱ Time: <span className="text-acc-teal">{meta.timeComplexity}</span></span>
          <span>💾 Space: <span className="text-acc-teal">{meta.spaceComplexity}</span></span>
          <span>📅 {meta.date}</span>
          <span>⏳ {meta.readingTime}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((t) => <Tag key={t} tag={t} />)}
        </div>
      </div>

      <hr className="border-line mb-8" />

      <MDXContent source={content} />
    </article>
  );
}