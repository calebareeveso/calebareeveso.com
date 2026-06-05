import fs from "fs";
import path from "path";
import { POSTS_DIR } from "@/lib/posts";

export type SavePostInput = {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
  writing: boolean;
  content: string;
};

/** Body committed for a "writing" (title-only) post; the real body stays local. */
export const WRITING_PLACEHOLDER = "_This post is being written. Check back soon._";

/** Lowercase kebab-case, alphanumerics + dashes only. */
export function sanitizeSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateSavePayload(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return "Invalid request.";
  const b = body as Record<string, unknown>;
  if (typeof b.title !== "string" || b.title.trim() === "") return "Title is required.";
  if (typeof b.slug !== "string" || sanitizeSlug(b.slug) === "") return "Slug is required.";
  if (typeof b.description !== "string" || b.description.trim() === "")
    return "Description is required.";
  if (typeof b.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(b.date))
    return "Date must be YYYY-MM-DD.";
  if (typeof b.published !== "boolean") return "Published must be a boolean.";
  if (typeof b.writing !== "boolean") return "Writing must be a boolean.";
  // In writing mode the body is withheld from the commit, so it may be empty.
  if (typeof b.content !== "string") return "Content is required.";
  if (b.writing !== true && b.content.trim() === "") return "Content is required.";
  return null;
}

/**
 * Write a post to content/posts/{slug}.mdx. The sanitized slug contains only
 * [a-z0-9-], so it cannot traverse out of the posts directory. Frontmatter
 * string values are JSON-stringified (valid YAML double-quoted scalars).
 */
export function writePost(input: SavePostInput): { slug: string; filePath: string } {
  const slug = sanitizeSlug(input.slug);
  if (!slug) throw new Error("Invalid slug.");

  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  // Defense in depth: ensure the resolved path stays inside POSTS_DIR.
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(POSTS_DIR) + path.sep)) {
    throw new Error("Invalid slug.");
  }

  const frontmatter = [
    "---",
    `title: ${JSON.stringify(input.title)}`,
    `slug: ${JSON.stringify(slug)}`,
    `description: ${JSON.stringify(input.description)}`,
    `date: ${JSON.stringify(input.date)}`,
    `published: ${input.published}`,
    `writing: ${input.writing}`,
    "---",
  ].join("\n");

  // Writing mode commits only the title/metadata; the body stays in the local
  // draft until a full publish.
  const rawBody = input.writing ? WRITING_PLACEHOLDER : input.content;
  const body = rawBody.replace(/\r\n/g, "\n").trimEnd();
  const file = `${frontmatter}\n\n${body}\n`;

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(filePath, file, "utf8");

  return { slug, filePath };
}
