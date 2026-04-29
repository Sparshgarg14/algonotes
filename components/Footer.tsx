export function Footer() {
  return (
    <footer className="border-t border-line px-6 md:px-16 py-6 flex items-center justify-between text-xs text-ink-muted">
      <span className="font-mono">algonotes</span>
      <span>Built with Next.js · Hosted free on Vercel</span>
      <a
        href="https://github.com/yourusername/algonotes"
        className="hover:text-ink-secondary transition-colors"
      >
        GitHub
      </a>
    </footer>
  );
}
