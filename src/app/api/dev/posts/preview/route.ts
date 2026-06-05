import { NextResponse } from "next/server";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import { bundlePost } from "@/lib/mdx";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Bundle MDX content on demand so the editor can render a live preview. */
export async function POST(request: Request) {
  if (!isDevEditorEnabled()) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  let content: unknown;
  try {
    ({ content } = await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof content !== "string") {
    return NextResponse.json({ ok: false, error: "content is required." }, { status: 400 });
  }

  try {
    const { code } = await bundlePost(content);
    return NextResponse.json({ ok: true, code });
  } catch (err) {
    // Surface MDX/esbuild errors to the preview pane instead of crashing.
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 200 },
    );
  }
}
