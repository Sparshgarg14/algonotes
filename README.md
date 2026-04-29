# AlgoNotes

> Your personal competitive programming brain dump — solutions, trick articles, contest logs, and blogs. Built with Next.js 14, hosted free on Vercel.

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy (free)

1. Push to GitHub
2. Go to vercel.com → Import → select your repo
3. Click Deploy → done. Auto-deploys on every `git push`.

---

## Adding Content

All content lives in `/content` as `.mdx` files. No CMS, no database.

### New Solution
Create `/content/solutions/XXXX-problem-name.mdx`:

```yaml
---
title: "Problem Title"
platform: "leetcode"          # leetcode | codeforces | atcoder | codechef
problemId: 123                # LC number (optional)
difficulty: "medium"          # easy | medium | hard | unrated
tags: ["dp", "binary-search"]
date: "2025-04-22"
language: "python"
timeComplexity: "O(n log n)"
spaceComplexity: "O(n)"
excerpt: "One line summary."
published: true
---
Your MDX content here...
```

### New Trick Article
Create `/content/tricks/trick-name.mdx`:

```yaml
---
title: "Trick Name"
category: "Binary Search"   # used for icon + grouping
level: "intermediate"       # beginner | intermediate | advanced
tags: ["binary-search"]
date: "2025-04-22"
excerpt: "One line summary."
published: true
---
```

### New Contest Log
Create `/content/contests/cf-round-XXX.mdx`:

```yaml
---
title: "Codeforces Round 987 Div.2"
platform: "codeforces"
round: "Codeforces Round 987 Div.2"
rank: 432
totalRank: 18400
ratingChange: +47
date: "2025-04-20"
tags: ["greedy"]
excerpt: "One line summary."
published: true
problems:
  - { id: "A", title: "Tram",  solved: true,  time: "03:12" }
  - { id: "B", title: "Frog",  solved: true,  time: "11:45" }
  - { id: "C", title: "Jumps", solved: false }
---
```

### New Blog Post
Create `/content/blog/post-slug.mdx`:

```yaml
---
title: "Post Title"
date: "2025-04-22"
tags: ["mindset"]
excerpt: "One line summary."
published: true
---
```

---

## MDX Custom Components

Available inside every `.mdx` file:

```mdx
<Callout type="tip">   Tip box   </Callout>
<Callout type="warn">  Warning   </Callout>
<Callout type="info">  Info      </Callout>

<Complexity time="O(n log n)" space="O(n)" />
```

---

## File Structure

```
algonotes/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (navbar + footer)
│   ├── page.tsx            # Homepage
│   ├── solutions/          # /solutions + /solutions/[slug]
│   ├── tricks/             # /tricks   + /tricks/[slug]
│   ├── contests/           # /contests + /contests/[slug]
│   └── blog/               # /blog     + /blog/[slug]
│
├── components/             # Reusable UI components
├── content/                # ← ALL YOUR WRITING LIVES HERE
│   ├── solutions/
│   ├── tricks/
│   ├── contests/
│   └── blog/
│
├── lib/
│   ├── types.ts            # Central type definitions
│   ├── mdx.ts              # Content engine (reads MDX files)
│   └── shiki.ts            # Syntax highlighter
│
└── styles/globals.css      # Design tokens + Tailwind base
```

---

## Planned Enhancements (Easy to Add)

- [ ] `/tags` page — `lib/mdx.ts` already has `getAllTags()`
- [ ] Search — add `pagefind` (runs at build time, zero cost)
- [ ] Comments — add `giscus` (GitHub Discussions, free)
- [ ] RSS feed — one new `app/feed.xml/route.ts` file
- [ ] Light mode — CSS variables already set up in `globals.css`
- [ ] Rating graph — add a chart component to contest detail page
- [ ] Problem count per tag — `getAllTags()` returns counts
