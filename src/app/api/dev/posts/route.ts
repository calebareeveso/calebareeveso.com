import { NextResponse } from "next/server";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import { getAllPosts } from "@/lib/posts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** List committed posts (incl. content) for the editor sidebar. */
export async function GET() {
  if (!isDevEditorEnabled()) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    published: p.published,
    writing: p.writing,
    content: p.content,
  }));

  return NextResponse.json({ ok: true, posts });
}
