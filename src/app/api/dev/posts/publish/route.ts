import { NextResponse } from "next/server";
import path from "path";
import { execFile } from "child_process";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import { validateSavePayload, writePost, type SavePostInput } from "@/lib/dev-posts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SCRIPT = path.join(process.cwd(), "scripts/publish-post.sh");

function runPublish(
  filePath: string,
  title: string,
): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    // execFile (not exec) — args are passed without a shell, so the
    // title/path are never interpreted as shell input.
    execFile(
      "bash",
      [SCRIPT, filePath, title],
      { cwd: process.cwd(), timeout: 60_000 },
      (err, stdout, stderr) => {
        const code =
          err && typeof (err as { code?: unknown }).code === "number"
            ? ((err as { code: number }).code)
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const error = validateSavePayload(body);
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  let slug: string;
  let filePath: string;
  try {
    ({ slug, filePath } = writePost(body as SavePostInput));
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 400 },
    );
  }

  const { stdout, stderr, code } = await runPublish(filePath, (body as SavePostInput).title);
  const output = `${stdout}${stderr}`.trim();

  if (code !== 0) {
    return NextResponse.json(
      { ok: false, slug, filePath, error: output || "Publish failed." },
      { status: 500 },
    );
  }

  const message = output.includes("No changes to publish")
    ? "Saved. No changes to publish (already up to date)."
    : "Published.";

  return NextResponse.json({ ok: true, slug, filePath, message, output });
}
