import { getTrick, getAllTricks } from "@/lib/mdx";
import { MDXContent }  from "@/components/MDXContent";
import { Tag }         from "@/components/Tag";
import { notFound }    from "next/navigation";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try { const { meta } = getTrick((await params).slug); return { title: meta.title }; }
  catch { return { title: "Trick" }; }
}

export function generateStaticParams() {
  return getAllTricks().map((t) => ({ slug: t.slug }));
}

export default async function TrickPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try { data = getTrick(slug); } catch { notFound(); }
  const { meta, content } = data;

  return (
    <article className="px-6 md:px-16 py-12 max-w-3xl">
      <div className="mb-8">
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-acc-teal/10 text-acc-teal capitalize mb-4 inline-block">
          {meta.category} · {meta.level}
        </span>
        <h1 className="font-display text-3xl font-semibold mb-3">{meta.title}</h1>
        <p className="text-ink-secondary mb-4">{meta.excerpt}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {meta.tags.map((t) => <Tag key={t} tag={t} />)}
        </div>
        <p className="text-xs font-mono text-ink-muted">{meta.date} · {meta.readingTime}</p>
      </div>
      <hr className="border-line mb-8" />
      <MDXContent source={content} />
    </article>
  );
}
