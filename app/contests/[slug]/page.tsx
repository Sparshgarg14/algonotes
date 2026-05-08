import { getContest, getAllContests } from "@/lib/mdx";
import { MDXContent }  from "@/components/MDXContent";
import { Tag }         from "@/components/Tag";
import { notFound }    from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try { const { meta } = getContest(slug); return { title: meta.title }; }
  catch { return { title: "Contest Not Found" }; }
}

export function generateStaticParams() {
  return getAllContests().map((c) => ({ slug: c.slug }));
}

export default async function ContestPage({ params }: Props) {
  const { slug } = await params;

  let data;
  try { data = getContest(slug); } catch { notFound(); }
  const { meta, content } = data!;

  return (
    <article className="px-6 md:px-16 py-12 max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-acc-amber/10 text-acc-amber uppercase">
            {meta.platform}
          </span>
          {meta.ratingChange !== undefined && (
            <span className={`text-sm font-mono font-semibold ${meta.ratingChange >= 0 ? "text-acc-teal" : "text-acc-red"}`}>
              {meta.ratingChange >= 0 ? "+" : ""}{meta.ratingChange} rating
            </span>
          )}
        </div>
        <h1 className="font-display text-3xl font-semibold mb-2">{meta.round}</h1>
        {meta.rank && (
          <p className="text-ink-secondary mb-4">
            Rank <strong className="text-ink-primary">{meta.rank}</strong>
            {meta.totalRank ? ` / ${meta.totalRank.toLocaleString()}` : ""}
          </p>
        )}
        <div className="flex gap-2 mb-4">
          {meta.problems?.map((p: any) => (
            <div key={p.id}
              className={`flex flex-col items-center rounded-lg px-3 py-2 border text-xs font-mono
                ${p.solved ? "border-acc-teal/30 bg-acc-teal/5 text-acc-teal" : "border-line text-ink-muted opacity-50"}`}>
              <span className="font-semibold">{p.id}</span>
              <span className="text-base mt-1">{p.solved ? "✓" : "✗"}</span>
              {p.time && <span className="text-[10px] mt-0.5 opacity-70">{p.time}</span>}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((t: string) => <Tag key={t} tag={t} />)}
        </div>
      </div>
      <hr className="border-line mb-8" />
      <MDXContent source={content} />
    </article>
  );
}