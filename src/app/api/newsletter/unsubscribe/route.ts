import { NextResponse } from "next/server";
import { isValidEmail, unsubscribeEmail } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function htmlPage(heading: string, body: string, status: number) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${heading}</title>
  </head>
  <body style="margin:0;padding:40px 20px;background:#fff;color:#000;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;">
      <p style="font-size:12px;letter-spacing:.02em;text-transform:uppercase;margin:0 0 32px 0;color:#000;">Caleb Areeveso</p>
      <h1 style="font-size:20px;font-weight:400;line-height:1.3;margin:0 0 16px 0;color:#000;">${heading}</h1>
      <p style="font-size:14px;line-height:1.7;margin:0;color:#777;">${body}</p>
    </div>
  </body>
</html>`;
  return new NextResponse(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  if (!isValidEmail(email) || !token) {
    return htmlPage("Invalid link", "This unsubscribe link isn’t valid.", 400);
  }

  const ok = await unsubscribeEmail(email, token);
  if (!ok) {
    return htmlPage("Invalid link", "This unsubscribe link isn’t valid.", 400);
  }

  return htmlPage(
    "You’re unsubscribed.",
    "You won’t receive new post emails anymore.",
    200,
  );
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  let email = searchParams.get("email") ?? "";
  let token = searchParams.get("token") ?? "";

  if (!email || !token) {
    try {
      const body = await request.json();
      if (typeof body?.email === "string") email = body.email;
      if (typeof body?.token === "string") token = body.token;
    } catch {
      // Some clients POST form-encoded one-click requests with no JSON body.
    }
  }

  if (!isValidEmail(email) || !token) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ok = await unsubscribeEmail(email, token);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
