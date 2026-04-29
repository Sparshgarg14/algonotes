import Link from "next/link";

export function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <Link href={href} className="text-xs text-acc-purple hover:underline">
        View all →
      </Link>
    </div>
  );
}
