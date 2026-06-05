import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Caleb Areeveso",
  description:
    "Short notes on building products, code, and some android / internet things.",
};

function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <div className="wrapper flex justify-center min-h-screen">
      <div className="max-w-xl mx-auto container px-4 py-20">
        <main className="flex flex-col gap-10">
          <p className="text-base font-mono text-black">BLOG</p>

          {posts.length === 0 ? (
            <p className="text-base text-secondary/60">No posts yet.</p>
          ) : (
            <div className="flex flex-col gap-8">
              {posts.map((post, index) => (
                <div key={post.slug} className="flex items-start gap-4">
                  <div>
                    <p className="text-base font-mono text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-base text-black hover:text-primary transition-colors duration-300"
                    >
                      {post.title}
                    </Link>
                    <p className="text-[12.5px] font-mono text-secondary/60">
                      {formatDate(post.date)}
                      {post.writing && <span className="ml-2 uppercase">· writing</span>}
                    </p>
                    <p className="text-base text-secondary">
                      {post.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center gap-2">
            <Link
              href="/#newsletter"
              className="text-base text-secondary hover:text-primary transition-colors duration-300"
            >
              Newsletter
            </Link>
            <Link
              href="/"
              className="text-base text-secondary hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
