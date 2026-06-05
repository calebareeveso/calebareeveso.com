import { NextResponse } from "next/server";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import { validateSavePayload, writePost, type SavePostInput } from "@/lib/dev-posts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  try {
    const { slug, filePath } = writePost(body as SavePostInput);
    return NextResponse.json({ ok: true, slug, filePath });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 400 },
    );
  }
}
