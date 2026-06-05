export type PostEmail = {
  subject: string;
  html: string;
  text: string;
};

type PostEmailInput = {
  post: { title: string; description: string };
  postUrl: string;
  unsubscribeUrl: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Minimal black/white/grey new-post notification email, inline CSS only.
 */
export function buildPostEmail({
  post,
  postUrl,
  unsubscribeUrl,
}: PostEmailInput): PostEmail {
  const subject = `New post: ${post.title}`;
  const title = escapeHtml(post.title);
  const description = escapeHtml(post.description);

  const html = `<div style="margin:0;padding:40px 20px;background:#fff;color:#000;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:12px;letter-spacing:.02em;text-transform:uppercase;margin:0 0 32px 0;color:#000;">
      CALEBAREEVESO.COM
    </p>
    <p style="font-size:14px;line-height:1.7;margin:0 0 16px 0;color:#777;">New post.</p>
    <h1 style="font-size:20px;font-weight:400;line-height:1.3;margin:0 0 12px 0;color:#000;">
      ${title}
    </h1>
    <p style="font-size:14px;line-height:1.7;margin:0 0 24px 0;color:#777;">${description}</p>
    <p style="font-size:14px;line-height:1.7;margin:0 0 32px 0;color:#777;">
      <a href="${postUrl}" style="color:#000;text-decoration:underline;">Read the post</a>
    </p>
    <p style="font-size:12px;line-height:1.7;margin:0;color:#999;">
      <a href="${unsubscribeUrl}" style="color:#999;text-decoration:underline;">Unsubscribe</a>
    </p>
  </div>
</div>`;

  const text = `New post.

${post.title}

${post.description}

Read:
${postUrl}

Unsubscribe:
${unsubscribeUrl}`;

  return { subject, html, text };
}
