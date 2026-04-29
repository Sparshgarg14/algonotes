import { getAllSolutions, getAllTricks, getAllContests, getAllBlogs, getSiteStats } from "@/lib/mdx";
import { SolutionCard }  from "@/components/SolutionCard";
import { TrickCard }     from "@/components/TrickCard";
import { ContestCard }   from "@/components/ContestCard";
import { BlogCard }      from "@/components/BlogCard";
import { SectionHeader } from "@/components/SectionHeader";
import { HeroStats }     from "@/components/HeroStats";

export default function HomePage() {
  const stats     = getSiteStats();
  const solutions = getAllSolutions().slice(0, 3);
  const tricks    = getAllTricks().slice(0, 3);
  const contests  = getAllContests().slice(0, 2);
  const blogs     = getAllBlogs().slice(0, 2);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="px-6 md:px-16 pt-16 pb-10 max-w-5xl">
        <div className="inline-flex items-center gap-2 bg-acc-purple/10 border border-acc-purple/25 rounded-full px-3 py-1 text-xs text-acc-purple mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-acc-teal inline-block" />
          Competitive programming · open notes
        </div>
        <h1 className="font-display text-5xl md:text-6xl leading-tight font-semibold mb-4">
          Where I dump every<br />
          <em className="text-acc-teal not-italic">algorithm brain cell.</em>
        </h1>
        <p className="text-ink-secondary max-w-xl leading-relaxed mb-8">
          Solutions to LeetCode &amp; Codeforces problems, in-depth trick writeups,
          contest post-mortems, and CP thoughts — all searchable, all free.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a href="/solutions" className="px-5 py-2.5 rounded-lg bg-acc-purple text-white text-sm font-medium hover:bg-acc-purple/90 transition-colors">
            Browse Solutions
          </a>
          <a href="/tricks" className="px-5 py-2.5 rounded-lg border border-line text-sm hover:border-acc-purple/40 transition-colors">
            Read Articles
          </a>
        </div>
      </section>

      <HeroStats stats={stats} />

      {/* ── Recent Solutions ── */}
      <section className="px-6 md:px-16 py-10 max-w-5xl">
        <SectionHeader title="Recent Solutions" href="/solutions" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {solutions.map((s) => <SolutionCard key={s.slug} solution={s} />)}
        </div>
      </section>

      {/* ── Trick Articles ── */}
      <section className="px-6 md:px-16 py-10 max-w-5xl border-t border-line">
        <SectionHeader title="Trick Articles" href="/tricks" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tricks.map((t) => <TrickCard key={t.slug} trick={t} />)}
        </div>
      </section>

      {/* ── Contest Logs ── */}
      <section className="px-6 md:px-16 py-10 max-w-5xl border-t border-line">
        <SectionHeader title="Contest Logs" href="/contests" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contests.map((c) => <ContestCard key={c.slug} contest={c} />)}
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="px-6 md:px-16 py-10 max-w-5xl border-t border-line">
        <SectionHeader title="From the Blog" href="/blog" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs.map((b) => <BlogCard key={b.slug} post={b} />)}
        </div>
      </section>
    </div>
  );
}
