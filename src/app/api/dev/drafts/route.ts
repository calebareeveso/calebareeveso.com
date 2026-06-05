import { NextResponse } from "next/server";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import { listDrafts, saveDraft, deleteDraft } from "@/lib/drafts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function guard() {
  return isDevEditorEnabled()
    ? null
    : NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
}

export async function GET() {
  const blocked = guard();
  if (blocked) return blocked;
  return NextResponse.json({ ok: true, drafts: listDrafts() });
}

export async function POST(request: Request) {
  const blocked = guard();
  if (blocked) return blocked;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.slug !== "string" || body.slug.trim() === "") {
    return NextResponse.json({ ok: false, error: "slug is required." }, { status: 400 });
  }

  try {
    const draft = saveDraft({
      slug: body.slug,
      title: typeof body.title === "string" ? body.title : "",
      description: typeof body.description === "string" ? body.description : "",
      date: typeof body.date === "string" ? body.date : "",
      published: body.published === true,
      writing: body.writing === true,
      content: typeof body.content === "string" ? body.content : "",
    });
    return NextResponse.json({ ok: true, draft });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const blocked = guard();
  if (blocked) return blocked;

  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  if (!slug) {
    return NextResponse.json({ ok: false, error: "slug is required." }, { status: 400 });
  }

  try {
    const deleted = deleteDraft(slug);
    return NextResponse.json({ ok: true, deleted });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}
