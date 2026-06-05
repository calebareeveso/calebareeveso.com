import crypto from "crypto";
import { getSubscribers, type SubscriberSource } from "@/lib/mongodb";
import { sendEmail } from "@/lib/email/send-email";
import { buildWelcomeEmail } from "@/lib/email/welcome-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeSource(source: unknown): SubscriberSource {
  return source === "homepage" || source === "blog" ? source : "unknown";
}

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://calebareeveso.com").replace(/\/$/, "");
}

export function buildUnsubscribeUrl(email: string, token: string): string {
  const params = new URLSearchParams({ email, token });
  return `${getSiteUrl()}/api/newsletter/unsubscribe?${params.toString()}`;
}

/**
 * Subscribe (or re-subscribe) an email. Idempotent:
 * - new email -> create + send welcome
 * - previously unsubscribed -> flip to subscribed + send welcome
 * - already subscribed -> no-op, no duplicate, no second welcome
 *
 * The subscriber is always persisted before the (best-effort) welcome send.
 */
export async function subscribeEmail(rawEmail: string, source: SubscriberSource): Promise<void> {
  const email = normalizeEmail(rawEmail);
  const subscribers = await getSubscribers();
  const now = new Date();

  const existing = await subscribers.findOne({ email });

  if (existing && existing.status === "subscribed") {
    return; // already on the list, nothing to do
  }

  let shouldSendWelcome = false;

  if (!existing) {
    await subscribers.insertOne({
      email,
      status: "subscribed",
      source,
      subscribedAt: now,
      updatedAt: now,
      unsubscribeToken: crypto.randomBytes(32).toString("hex"),
    });
    shouldSendWelcome = true;
  } else {
    // existing.status === "unsubscribed" -> resubscribe
    await subscribers.updateOne(
      { email },
      {
        $set: { status: "subscribed", subscribedAt: now, updatedAt: now },
        $unset: { unsubscribedAt: "" },
      },
    );
    shouldSendWelcome = true;
  }

  if (!shouldSendWelcome) return;

  const doc = await subscribers.findOne({ email });
  if (!doc) return;

  try {
    const { subject, html, text } = buildWelcomeEmail({ blogUrl: `${getSiteUrl()}/blog` });
    await sendEmail({
      to: email,
      subject,
      html,
      text,
      headers: {
        "List-Unsubscribe": `<${buildUnsubscribeUrl(email, doc.unsubscribeToken)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    await subscribers.updateOne({ email }, { $set: { welcomeEmailSentAt: new Date() } });
  } catch (err) {
    // Don't fail the signup if the welcome email bounces; just log it.
    console.error("[newsletter] welcome email failed:", (err as Error).message);
  }
}

/**
 * Mark an email as unsubscribed if the token matches. Returns true on success.
 */
export async function unsubscribeEmail(rawEmail: string, token: string): Promise<boolean> {
  const email = normalizeEmail(rawEmail);
  const subscribers = await getSubscribers();

  const result = await subscribers.updateOne(
    { email, unsubscribeToken: token },
    { $set: { status: "unsubscribed", unsubscribedAt: new Date(), updatedAt: new Date() } },
  );

  return result.matchedCount > 0;
}
