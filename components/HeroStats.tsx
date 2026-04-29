export function HeroStats({ stats }: { stats: Record<string, number> }) {
  const items = [
    { label: "Solutions", value: stats.solutions },
    { label: "Tricks",    value: stats.tricks    },
    { label: "Contests",  value: stats.contests  },
    { label: "Blogs",     value: stats.blogs     },
  ];

  return (
    <div className="flex border-y border-line bg-bg-secondary">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="flex-1 text-center py-4 border-r border-line last:border-r-0"
        >
          <div className="font-mono text-2xl font-semibold text-acc-purple">{value}</div>
          <div className="text-xs text-ink-muted mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  );
}
