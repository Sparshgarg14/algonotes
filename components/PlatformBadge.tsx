const PLATFORM_STYLE: Record<string, string> = {
  leetcode:   "bg-yellow-400/10 text-yellow-400",
  codeforces: "bg-acc-teal/10 text-acc-teal",
  atcoder:    "bg-acc-purple/10 text-acc-purple",
  codechef:   "bg-acc-amber/10 text-acc-amber",
};

export function PlatformBadge({ platform }: { platform: string }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded font-mono uppercase tracking-wide ${
        PLATFORM_STYLE[platform] ?? ""
      }`}
    >
      {platform}
    </span>
  );
}
