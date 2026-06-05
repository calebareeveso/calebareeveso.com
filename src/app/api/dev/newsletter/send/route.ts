import { NextResponse } from "next/server";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import { getSubscribers } from "@/lib/mongodb";
import { sendBatch, type BatchEntry } from "@/lib/email/send-email";
import { buildUnsubscribeUrl, getSiteUrl, isValidEmail, normalizeEmail } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UNSUB_PLACEHOLDER = /\{\{unsubscribe_url\}\}/g;

/** Naive HTML → text fallback for deliverability. */
function htmlToText(html: string): string {
  return html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\s*\/(p|div|h[1-6])\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Compose-and-send to a chosen recipient list (dev editor only). Does NOT touch
 * the subscribers DB — the recipient list is whatever the composer passed in.
 * Per-recipient `{{unsubscribe_url}}` is resolved from each subscriber's token.
 */
export async function POST(request: Request) {
  if (!isDevEditorEnabled()) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  let body: { subject?: unknown; html?: unknown; recipients?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const html = typeof body.html === "string" ? body.html : "";
  if (!subject) return NextResponse.json({ ok: false, error: "Subject is required." }, { status: 400 });
  if (!html.trim()) return NextResponse.json({ ok: false, error: "Body is required." }, { status: 400 });

  const rawList = Array.isArray(body.recipients) ? body.recipients : [];
  const recipients = Array.from(
    new Set(
      rawList
        .filter((e): e is string => isValidEmail(e))
        .map((e) => normalizeEmail(e)),
    ),
  );
  if (recipients.length === 0) {
    return NextResponse.json({ ok: false, error: "No valid recipients." }, { status: 400 });
  }

  const subscribers = await getSubscribers();
  const siteUrl = getSiteUrl();

  const entries: BatchEntry[] = [];
  for (const email of recipients) {
    const sub = await subscribers.findOne({ email }, { projection: { unsubscribeToken: 1 } });
    const token = sub?.unsubscribeToken;
    const unsubscribeUrl = token ? buildUnsubscribeUrl(email, token) : `${siteUrl}/#newsletter`;

    const recipientHtml = html.replace(UNSUB_PLACEHOLDER, unsubscribeUrl);
    entries.push({
      to: email,
      subject,
      html: recipientHtml,
      text: htmlToText(recipientHtml),
      headers: token
        ? {
            "List-Unsubscribe": `<${unsubscribeUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          }
        : undefined,
    });
  }

  try {
    const { sent, failed } = await sendBatch(entries);
    return NextResponse.json({ ok: true, sent, failed, total: entries.length });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
