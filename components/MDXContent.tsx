"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CopyButton } from "./CopyButton";

const components = {
  pre: ({ children }: any) => {
    const code = children?.props?.children ?? "";
    return (
      <div className="relative group my-5">
        <CopyButton code={code} />
        <pre className="bg-bg-tertiary rounded-lg p-4 overflow-x-auto text-sm font-mono text-ink-secondary border border-line">
          <code>{code}</code>
        </pre>
      </div>
    );
  },

  Callout: ({ type = "tip", children }: { type?: "tip" | "warn" | "info"; children: React.ReactNode }) => {
    const styles = {
      tip:  "border-acc-teal/30  bg-acc-teal/5",
      warn: "border-acc-amber/30 bg-acc-amber/5",
      info: "border-acc-purple/30 bg-acc-purple/5",
    };
    const icons = { tip: "💡", warn: "⚠️", info: "ℹ️" };
    return (
      <div className={`border rounded-lg px-4 py-3 my-4 flex gap-3 ${styles[type]}`}>
        <span>{icons[type]}</span>
        <div className="text-ink-secondary text-sm">{children}</div>
      </div>
    );
  },

  Complexity: ({ time, space }: { time: string; space: string }) => (
    <div className="flex gap-6 my-4 text-sm font-mono">
      <span>Time: <span className="text-acc-teal">{time}</span></span>
      <span>Space: <span className="text-acc-teal">{space}</span></span>
    </div>
  ),
};

export function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return (
    <div className="prose prose-invert max-w-none
      prose-headings:font-semibold
      prose-p:text-ink-secondary prose-p:leading-relaxed
      prose-li:text-ink-secondary
      prose-strong:text-ink-primary
      prose-blockquote:text-ink-muted
      prose-code:text-acc-teal
      prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0
    ">
      <MDXRemote {...source} components={components} />
    </div>
  );
}