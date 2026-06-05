export type WelcomeEmail = {
  subject: string;
  html: string;
  text: string;
};

/**
 * Minimal black/white/grey welcome email, inline CSS only, max-width 560px.
 */
export function buildWelcomeEmail({
  blogUrl,
}: {
  blogUrl: string;
}): WelcomeEmail {
  const subject = "You're on the list";

  const html = `<div style="margin:0;padding:40px 20px;background:#fff;color:#000;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:12px;letter-spacing:.02em;text-transform:uppercase;margin:0 0 32px 0;color:#000;">
      CALEBAREEVESO.COM
    </p>
    <h1 style="font-size:20px;font-weight:400;line-height:1.3;margin:0 0 20px 0;color:#000;">
      You're on the list.
    </h1>
    <p style="font-size:14px;line-height:1.7;margin:0 0 16px 0;color:#777;">
      Thanks for joining. I'll send you new posts when I publish them.
    </p>
    <p style="font-size:14px;line-height:1.7;margin:0 0 32px 0;color:#777;">
      <a href="${blogUrl}" style="color:#000;text-decoration:underline;">Read the blog</a>
    </p>
    <p style="font-size:14px;line-height:1.7;margin:0;color:#777;">— Caleb</p>
  </div>
</div>`;

  const text = `You're on the list.

Thanks for joining. I'll send you new posts when I publish them.

Read the blog:
${blogUrl}

— Caleb`;

  return { subject, html, text };
}
