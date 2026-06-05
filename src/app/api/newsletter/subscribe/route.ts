import { NextResponse } from "next/server";
import { isValidEmail, normalizeSource, subscribeEmail } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently succeed without saving or emailing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, message: "You're on the list." });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
  }

  try {
    await subscribeEmail(body.email, normalizeSource(body.source));
    return NextResponse.json({ ok: true, message: "You're on the list." });
  } catch (err) {
    console.error("[newsletter] subscribe failed:", (err as Error).message);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
