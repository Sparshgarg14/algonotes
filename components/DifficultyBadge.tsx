const DIFF_STYLE: Record<string, string> = {
  easy:    "bg-acc-teal/10 text-acc-teal",
  medium:  "bg-acc-amber/10 text-acc-amber",
  hard:    "bg-acc-red/10 text-acc-red",
  unrated: "bg-ink-muted/10 text-ink-muted",
};

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded font-mono uppercase tracking-wide ${
        DIFF_STYLE[difficulty] ?? DIFF_STYLE.unrated
      }`}
    >
      {difficulty}
    </span>
  );
}
