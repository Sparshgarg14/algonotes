import { createHighlighter } from "shiki";

// Singleton — created once, reused across all pages
let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

export async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["one-dark-pro"],
      langs:  ["cpp", "python", "java", "rust", "go", "typescript", "bash", "markdown"],
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, { lang, theme: "one-dark-pro" });
}
