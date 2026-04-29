"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV = [
  { label: "Solutions", href: "/solutions" },
  { label: "Tricks",    href: "/tricks"    },
  { label: "Contests",  href: "/contests"  },
  { label: "Blog",      href: "/blog"      },
];

export function Navbar() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg-primary/80 backdrop-blur">
      <nav className="flex items-center justify-between px-6 md:px-16 h-14">

        <Link href="/" className="font-mono text-lg font-semibold">
          algo<span className="text-acc-teal">notes</span>
          <span className="text-ink-muted">.</span>
        </Link>

        <ul className="flex items-center gap-1">
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "px-3 py-1.5 rounded-md text-sm transition-colors",
                  path.startsWith(href)
                    ? "text-ink-primary bg-bg-tertiary"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-bg-secondary"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* future: search icon, theme toggle */}
      </nav>
    </header>
  );
}
