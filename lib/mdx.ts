/* ─────────────────────────────────────────────────────
   Content engine
   One generic function that reads any content folder.
   Adding a new content type = add one new folder under
   /content and one typed getter below. Nothing else
   needs to change.
───────────────────────────────────────────────────── */

import fs   from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Solution, TrickArticle, ContestLog, BlogPost } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ── Generic helpers ─────────────────────────────── */

function getPostSlugs(folder: string): string[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function parsePost<T>(folder: string, filename: string): T & { slug: string; readingTime: string } {
  const fullPath = path.join(CONTENT_DIR, folder, filename);
  const raw      = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx$/, "");
  return {
    ...data,
    slug,
    readingTime: readingTime(content).text,
  } as T & { slug: string; readingTime: string };
}

/* ── Typed getters ───────────────────────────────── */

export function getAllSolutions(): Solution[] {
  return getPostSlugs("solutions")
    .map((f) => parsePost<Solution>("solutions", f))
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getSolution(slug: string): { meta: Solution; content: string } {
  const fullPath = path.join(CONTENT_DIR, "solutions", `${slug}.mdx`);
  const raw      = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta:    { ...data, slug, readingTime: readingTime(content).text } as Solution,
    content,
  };
}

export function getAllTricks(): TrickArticle[] {
  return getPostSlugs("tricks")
    .map((f) => parsePost<TrickArticle>("tricks", f))
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getTrick(slug: string): { meta: TrickArticle; content: string } {
  const fullPath = path.join(CONTENT_DIR, "tricks", `${slug}.mdx`);
  const raw      = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta:    { ...data, slug, readingTime: readingTime(content).text } as TrickArticle,
    content,
  };
}

export function getAllContests(): ContestLog[] {
  return getPostSlugs("contests")
    .map((f) => parsePost<ContestLog>("contests", f))
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getContest(slug: string): { meta: ContestLog; content: string } {
  const fullPath = path.join(CONTENT_DIR, "contests", `${slug}.mdx`);
  const raw      = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta:    { ...data, slug, readingTime: readingTime(content).text } as ContestLog,
    content,
  };
}

export function getAllBlogs(): BlogPost[] {
  return getPostSlugs("blog")
    .map((f) => parsePost<BlogPost>("blog", f))
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlog(slug: string): { meta: BlogPost; content: string } {
  const fullPath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);
  const raw      = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta:    { ...data, slug, readingTime: readingTime(content).text } as BlogPost,
    content,
  };
}

/* ── Site-wide stats (used on homepage) ──────────── */

export function getSiteStats() {
  return {
    solutions: getAllSolutions().length,
    tricks:    getAllTricks().length,
    contests:  getAllContests().length,
    blogs:     getAllBlogs().length,
  };
}

/* ── Tag aggregator (used for /tags page) ─────────── */

export function getAllTags(): Record<string, number> {
  const all = [
    ...getAllSolutions(),
    ...getAllTricks(),
    ...getAllBlogs(),
  ];
  const counts: Record<string, number> = {};
  all.forEach((p) => p.tags?.forEach((t) => { counts[t] = (counts[t] ?? 0) + 1; }));
  return counts;
}
