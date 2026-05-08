"use client";

import { useEffect, useState } from "react";

interface ViewCountProps {
  slug: string;
}

export function ViewCount({ slug }: ViewCountProps) {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function updateCount() {
      try {
        const response = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Unable to update view count");
        }

        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        setError("Unable to load read count");
        console.error(err);
      }
    }

    updateCount();
  }, [slug]);

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/80 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
      <span>👁️</span>
      {error ? (
        <span>{error}</span>
      ) : count === null ? (
        <span>Loading read count…</span>
      ) : (
        <span>{count.toLocaleString()} read{count === 1 ? "" : "s"} so far</span>
      )}
    </div>
  );
}
