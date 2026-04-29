import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Fraunces'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        bg: {
          primary:   "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary:  "var(--bg-tertiary)",
        },
        acc: {
          purple: "var(--acc-purple)",
          teal:   "var(--acc-teal)",
          amber:  "var(--acc-amber)",
          red:    "var(--acc-red)",
        },
        ink: {
          primary:   "var(--ink-primary)",
          secondary: "var(--ink-secondary)",
          muted:     "var(--ink-muted)",
        },
        line: "var(--line)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--ink-primary)",
            a: { color: "var(--acc-purple)" },
            code: {
              color: "var(--acc-teal)",
              background: "var(--bg-tertiary)",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after":  { content: '""' },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
