import { NextResponse } from "next/server";
import path from "path";
import { execFile } from "child_process";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import { sanitizeSlug } from "@/lib/dev-posts";
import { POSTS_DIR } from "@/lib/posts";
import { deleteDraft } from "@/lib/drafts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SCRIPT = path.join(process.cwd(), "scripts/delete-post.sh");

function runDelete(
  filePath: string,
  title: string,
): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    execFile(
      "bash",
      [SCRIPT, filePath, title],
      { cwd: process.cwd(), timeout: 60_000 },
      (err, stdout, stderr) => {
        const code =
          err && typeof (err as { code?: unknown }).code === "number"
            ? (err as { code: number }).code
            : err
              ? 1
              : 0;
        resolve({ stdout: stdout.toString(), stderr: stderr.toString(), code });
      },
    );
  });
}

export async function POST(request: Request) {
  if (!isDevEditorEnabled()) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  let body: { slug?: unknown; title?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? sanitizeSlug(body.slug) : "";
  if (!slug) {
    return NextResponse.json({ ok: false, error: "slug is required." }, { status: 400 });
  }

  const title = typeof body.title === "string" && body.title.trim() ? body.title : slug;
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  // Defense in depth: keep the path inside POSTS_DIR.
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(POSTS_DIR) + path.sep)) {
    return NextResponse.json({ ok: false, error: "Invalid slug." }, { status: 400 });
  }

  // Remove the committed/local post file (pushes the deletion if tracked).
  const { stdout, stderr, code } = await runDelete(filePath, title);
  const output = `${stdout}${stderr}`.trim();

  if (code !== 0) {
    return NextResponse.json(
      { ok: false, slug, error: output || "Delete failed." },
      { status: 500 },
    );
  }

  // Best-effort removal of the local draft too.
  let draftDeleted = false;
  try {
    draftDeleted = deleteDraft(slug);
  } catch {
    /* ignore */
  }

  return NextResponse.json({ ok: true, slug, draftDeleted, message: "Deleted.", output });
}
