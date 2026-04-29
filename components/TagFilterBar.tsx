"use client";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface Props {
  tags:         string[];
  platforms:    string[];
  difficulties: string[];
  active:       { tag?: string; platform?: string; difficulty?: string };
}

export function TagFilterBar({ tags, platforms, difficulties, active }: Props) {
  const router = useRouter();

  const set = (key: string, value: string) => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get(key) === value) sp.delete(key);
    else sp.set(key, value);
    router.push(`?${sp.toString()}`);
  };

  const clear = () => router.push("?");

  return (
    <div className="space-y-3">
      {/* Platforms */}
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => set("platform", p)}
            className={clsx(
              "text-xs px-3 py-1 rounded-full border font-mono capitalize transition-colors",
              active.platform === p
                ? "border-acc-teal bg-acc-teal/10 text-acc-teal"
                : "border-line text-ink-muted hover:border-acc-teal/40"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Difficulties */}
      <div className="flex flex-wrap gap-2">
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => set("difficulty", d)}
            className={clsx(
              "text-xs px-3 py-1 rounded-full border font-mono capitalize transition-colors",
              active.difficulty === d
                ? "border-acc-amber bg-acc-amber/10 text-acc-amber"
                : "border-line text-ink-muted hover:border-acc-amber/40"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => set("tag", t)}
            className={clsx(
              "text-xs px-2 py-0.5 rounded font-mono transition-colors",
              active.tag === t
                ? "bg-acc-purple text-white"
                : "bg-acc-purple/10 text-acc-purple hover:bg-acc-purple/20"
            )}
          >
            #{t}
          </button>
        ))}
      </div>

      {(active.tag || active.platform || active.difficulty) && (
        <button onClick={clear} className="text-xs text-ink-muted hover:text-ink-secondary transition-colors">
          ✕ clear filters
        </button>
      )}
    </div>
  );
}
