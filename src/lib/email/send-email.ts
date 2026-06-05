import { Resend } from "resend";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
};

let client: Resend | null = null;

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

function getFrom(): string {
  const address = process.env.NEWSLETTER_FROM_EMAIL;
  if (!address) {
    throw new Error("NEWSLETTER_FROM_EMAIL is not set");
  }
  const name = process.env.NEWSLETTER_FROM_NAME;
  return name ? `${name} <${address}>` : address;
}

/**
 * Send a single transactional/notification email through Resend.
 * Throws a useful (secret-free) error if Resend reports a failure.
 */
export async function sendEmail({ to, subject, html, text, headers }: SendEmailInput) {
  const { data, error } = await getResend().emails.send({
    from: getFrom(),
    to,
    subject,
    html,
    text,
    headers,
  });

  if (error) {
    // `error` carries name + message but never the API key.
    throw new Error(`Resend send failed: ${error.name} - ${error.message}`);
  }

  return data;
}

export type BatchEntry = {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
};

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

/**
 * Send one distinct email per recipient using Resend's batch API (≤100 per
 * call). Each recipient gets their own `to`, so this is not a bulk CC/BCC.
 * Returns how many were accepted vs failed.
 */
export async function sendBatch(entries: BatchEntry[]): Promise<{ sent: number; failed: number }> {
  if (entries.length === 0) return { sent: 0, failed: 0 };

  const from = getFrom();
  const resend = getResend();

  let sent = 0;
  let failed = 0;

  for (const batch of chunk(entries, 100)) {
    const payload = batch.map((e) => ({
      from,
      to: [e.to],
      subject: e.subject,
      html: e.html,
      text: e.text,
      headers: e.headers,
    }));

    try {
      const { error } = await resend.batch.send(payload);
      if (error) {
        failed += batch.length;
        console.error(`[email] batch send failed: ${error.name} - ${error.message}`);
      } else {
        sent += batch.length;
      }
    } catch (err) {
      failed += batch.length;
      console.error("[email] batch send threw:", (err as Error).message);
    }
  }

  return { sent, failed };
}
