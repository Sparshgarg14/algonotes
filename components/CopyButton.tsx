"use client";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 px-2 py-1 text-xs rounded font-mono
        bg-bg-primary border border-line text-ink-muted
        hover:border-acc-purple/40 hover:text-ink-primary transition-all
        opacity-0 group-hover:opacity-100"
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}
