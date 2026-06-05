import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sanitizeSlug } from "@/lib/dev-posts";

/**
 * Local, gitignored drafts. Stored as `.mdx` files with the same frontmatter
 * shape as published posts (see content/posts) so the format is consistent —
 * the only difference is the directory. Drafts always keep the full body, even
 * for "writing" posts. `updatedAt` is derived from the file's mtime.
 */
export const DRAFTS_DIR = path.join(process.cwd(), "content/drafts");

export type Draft = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  writing: boolean;
  content: string;
  updatedAt: string;
};

function draftPath(slug: string): string {
  const safe = sanitizeSlug(slug);
  if (!safe) throw new Error("Invalid slug.");
  const filePath = path.join(DRAFTS_DIR, `${safe}.mdx`);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(DRAFTS_DIR) + path.sep)) {
    throw new Error("Invalid slug.");
  }
  return filePath;
}

function parseDraftFile(filePath: string): Draft | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const slug =
      typeof data.slug === "string" && data.slug
        ? data.slug
        : path.basename(filePath, ".mdx");
    return {
      slug,
      title: typeof data.title === "string" ? data.title : "",
      description: typeof data.description === "string" ? data.description : "",
      date: typeof data.date === "string" ? data.date : "",
      published: data.published === true,
      writing: data.writing === true,
      content: content.replace(/^\n/, ""),
      updatedAt: fs.statSync(filePath).mtime.toISOString(),
    };
  } catch {
    return null;
  }
}

export function listDrafts(): Draft[] {
  if (!fs.existsSync(DRAFTS_DIR)) return [];
  return fs
    .readdirSync(DRAFTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parseDraftFile(path.join(DRAFTS_DIR, f)))
    .filter((d): d is Draft => d !== null)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getDraft(slug: string): Draft | null {
  const filePath = draftPath(slug);
  if (!fs.existsSync(filePath)) return null;
  return parseDraftFile(filePath);
}

export function saveDraft(input: Omit<Draft, "updatedAt">): Draft {
  const slug = sanitizeSlug(input.slug);
  if (!slug) throw new Error("Invalid slug.");

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

  const body = input.content.replace(/\r\n/g, "\n").trimEnd();
  const file = `${frontmatter}\n\n${body}\n`;

  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  const filePath = draftPath(slug);
  fs.writeFileSync(filePath, file, "utf8");

  return { ...input, slug, updatedAt: fs.statSync(filePath).mtime.toISOString() };
}

export function deleteDraft(slug: string): boolean {
  const filePath = draftPath(slug);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}
