import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
  filePath: string;
  content: string;
};

export const POSTS_DIR = path.join(process.cwd(), "content/posts");

function isValidFrontmatter(data: Record<string, unknown>): boolean {
  return (
    typeof data.title === "string" &&
    typeof data.slug === "string" &&
    typeof data.description === "string" &&
    typeof data.date === "string" &&
    typeof data.published === "boolean"
  );
}

function readPostFile(fileName: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!isValidFrontmatter(data)) {
    console.warn(`[posts] Skipping ${fileName}: missing/invalid required frontmatter.`);
    return null;
  }

  return {
    title: data.title as string,
    slug: data.slug as string,
    description: data.description as string,
    date: data.date as string,
    published: data.published as boolean,
    filePath,
    content,
  };
}

/** All posts (published and drafts), newest first. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPostFile)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Published posts only, newest first. */
export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.published);
}

/** Look up a single post by slug. Drafts are returned outside production. */
export function getPostBySlug(slug: string): BlogPost | null {
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return null;
  if (!post.published && process.env.NODE_ENV === "production") return null;
  return post;
}

export function getLatestPosts(limit: number): BlogPost[] {
  return getPublishedPosts().slice(0, limit);
}
