import { NextResponse } from "next/server";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import { getSubscribers } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** List subscribed emails for the email composer. Emails only — no tokens. */
export async function GET() {
  if (!isDevEditorEnabled()) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  const subscribers = await getSubscribers();
  const docs = await subscribers
    .find({ status: "subscribed" }, { projection: { email: 1, _id: 0 } })
    .toArray();

  const emails = docs.map((d) => d.email);
  return NextResponse.json({ ok: true, emails });
}
