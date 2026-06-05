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
