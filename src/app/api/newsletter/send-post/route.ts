import { NextResponse } from "next/server";
import { getSubscribers } from "@/lib/mongodb";
import { getPostBySlug } from "@/lib/posts";
import { sendEmail } from "@/lib/email/send-email";
import { buildPostEmail } from "@/lib/email/post-email";
import { buildUnsubscribeUrl, getSiteUrl } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Internal endpoint to email subscribers about a new post. Protected by
 * NEWSLETTER_SEND_SECRET. Sends one email per subscriber (never a bulk `to`).
 *
 * Not triggered automatically — call it after a deploy so links resolve to the
 * live post.
 */
export async function POST(request: Request) {
  const secret = process.env.NEWSLETTER_SEND_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Not configured." }, { status: 404 });
  }

  const provided =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    request.headers.get("x-newsletter-secret") ??
    "";
  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let slug: unknown;
  try {
    ({ slug } = await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof slug !== "string" || !slug) {
    return NextResponse.json({ ok: false, error: "slug is required." }, { status: 400 });
  }

  const post = getPostBySlug(slug);
  if (!post || !post.published) {
    return NextResponse.json({ ok: false, error: "Post not found." }, { status: 404 });
  }

  const postUrl = `${getSiteUrl()}/blog/${post.slug}`;
  const subscribers = await getSubscribers();
  const cursor = subscribers.find({ status: "subscribed" });

  let sent = 0;
  let failed = 0;

  for await (const sub of cursor) {
    const unsubscribeUrl = buildUnsubscribeUrl(sub.email, sub.unsubscribeToken);
    const { subject, html, text } = buildPostEmail({ post, postUrl, unsubscribeUrl });
    try {
      await sendEmail({
        to: sub.email,
        subject,
        html,
        text,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      sent += 1;
    } catch (err) {
      failed += 1;
      console.error(`[newsletter] send-post failed for ${sub.email}:`, (err as Error).message);
    }
  }

  return NextResponse.json({ ok: true, slug: post.slug, sent, failed });
}
