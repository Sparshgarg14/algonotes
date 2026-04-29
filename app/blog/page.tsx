import { getAllBlogs } from "@/lib/mdx";
import { BlogCard }   from "@/components/BlogCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllBlogs();
  return (
    <div className="px-6 md:px-16 py-12 max-w-5xl">
      <h1 className="font-display text-4xl font-semibold mb-2">Blog</h1>
      <p className="text-ink-secondary mb-8">Thoughts on CP, career, and code</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((p) => <BlogCard key={p.slug} post={p} />)}
      </div>
    </div>
  );
}
