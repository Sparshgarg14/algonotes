/* ─────────────────────────────────────────────────────
   Central type definitions
   Add new fields here as the site grows — all consuming
   code imports from this single file.
───────────────────────────────────────────────────── */

export type Platform  = "leetcode" | "codeforces" | "atcoder" | "codechef";
export type Difficulty = "easy" | "medium" | "hard" | "unrated";
export type Language   = "cpp" | "python" | "java" | "rust" | "go";

/* Shared base every content type extends */
export interface BasePost {
  slug:        string;
  title:       string;
  date:        string;   // ISO string "2025-04-22"
  tags:        string[];
  excerpt:     string;
  readingTime: string;   // "5 min read"
  published:   boolean;
}

export interface Solution extends BasePost {
  platform:       Platform;
  problemId?:     number;     // LC problem number
  difficulty:     Difficulty;
  language:       Language;
  timeComplexity: string;     // "O(n log n)"
  spaceComplexity: string;
  contestRound?:  string;     // "CF Round 987 Div.2 - D"
}

export interface TrickArticle extends BasePost {
  category: string;  // "Binary Search" | "Graph" | "DP" | ...
  level:    "beginner" | "intermediate" | "advanced";
}

export interface ContestLog extends BasePost {
  platform:   Platform;
  round:      string;   // "Codeforces Round 987 Div.2"
  rank?:      number;
  totalRank?: number;
  ratingChange?: number;
  problems:   ContestProblem[];
}

export interface ContestProblem {
  id:     string;   // "A", "B", "1", "2", ...
  title:  string;
  solved: boolean;
  time?:  string;   // "12:34"
  slug?:  string;   // link to solution if written
}

export interface BlogPost extends BasePost {
  coverImage?: string;
  category?:   string;
}
