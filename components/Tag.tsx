export function Tag({ tag }: { tag: string }) {
  return (
    <span className="text-xs font-mono px-2 py-0.5 rounded bg-acc-purple/10 text-acc-purple">
      #{tag}
    </span>
  );
}
