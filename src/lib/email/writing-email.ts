export type WritingEmail = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Minimal black/white/grey "currently writing" teaser email. Inline CSS only.
 */
export function buildWritingEmail({
  title,
  unsubscribeUrl,
}: {
  title: string;
  unsubscribeUrl: string;
}): WritingEmail {
  const safeTitle = escapeHtml(title);
  const subject = `I’m writing “${title}”`;

  const html = `<div style="margin:0;padding:40px 20px;background:#fff;color:#000;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:12px;letter-spacing:.02em;text-transform:uppercase;margin:0 0 32px 0;color:#000;">
      Caleb Areeveso
    </p>
    <h1 style="font-size:20px;font-weight:400;line-height:1.3;margin:0 0 16px 0;color:#000;">
      I’m writing “${safeTitle}”
    </h1>
    <p style="font-size:14px;line-height:1.7;margin:0 0 32px 0;color:#777;">
      It’ll be ready soon — watch your inbox.
    </p>
    <p style="font-size:14px;line-height:1.7;margin:0 0 32px 0;color:#777;">— Caleb</p>
    <p style="font-size:12px;line-height:1.7;margin:0;color:#999;">
      <a href="${unsubscribeUrl}" style="color:#999;text-decoration:underline;">Unsubscribe</a>
    </p>
  </div>
</div>`;

  const text = `I’m writing “${title}”

It’ll be ready soon — watch your inbox.

— Caleb

Unsubscribe:
${unsubscribeUrl}`;

  return { subject, html, text };
}
