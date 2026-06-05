You are working inside my existing Next.js website repository for calebareeveso.com.

Your task is to implement a minimal black-and-white newsletter + MDX blog system that matches the existing visual style of my current site.

Do not ask follow-up questions. Inspect the codebase first, understand whether it uses the App Router or Pages Router, understand the existing styling/components, then implement the feature in the least disruptive way possible. Preserve the current minimal design language: white background, black text, light grey secondary text, thin dividers, small typography, numbered sections, no colors, no gradients, no large marketing UI, no card-heavy design.

The current website is a very minimal personal homepage. It has numbered sections like Name, Location, Status, Face Card, Bio, Stalk Me, Contact, My Hustles/Projects, Credit, and Copyright. I want to remove/replace the projects/hustles section and use that area for a newsletter signup and latest blog posts.

Goal:

Build a local-first newsletter blog platform with:

1. A newsletter signup section on the homepage.
2. A hash anchor so `https://calebareeveso.com#newsletter` scrolls directly to the newsletter section.
3. A public `/blog` page listing all published blog posts.
4. A public `/blog/[slug]` page rendering individual MDX posts.
5. MongoDB-backed newsletter subscribers.
6. Cloudflare Email Service REST API emails.
7. A welcome email sent immediately after successful signup.
8. A local-only dev editor at `/dev/editor`.
9. The dev editor supports writing MDX posts and saving them to local file storage in the codebase.
10. MDX posts should be able to import React components from the codebase.
11. A local-only publish action that runs a bash script to commit the new/updated MDX post and push to GitHub.
12. Hosted production should never expose or run the dev editor, filesystem write APIs, or bash publish APIs.

Use TypeScript if the repo is TypeScript. Follow the project’s existing formatting and component conventions.

Environment variables to support:

```env
MONGODB_URI=
MONGODB_DB=calebareeveso

CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_EMAIL_API_TOKEN=

NEWSLETTER_FROM_EMAIL=
NEWSLETTER_FROM_NAME=Caleb Areeveso

NEXT_PUBLIC_SITE_URL=https://calebareeveso.com

DEV_EDITOR_ENABLED=false
```

Also create or update `.env.example` with these variables, but never commit real secrets.

Cloudflare Email Service REST API details:

Use this endpoint:

```txt
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send
```

Use this authorization header:

```txt
Authorization: Bearer ${CLOUDFLARE_EMAIL_API_TOKEN}
```

Use this request shape:

```ts
{
  to: string | string[] | { address: string; name?: string },
  from: string | { address: string; name?: string },
  subject: string,
  html: string,
  text: string,
  headers?: Record<string, string>
}
```

Implement a reusable helper:

```txt
lib/email/send-cloudflare-email.ts
```

The helper should:

- Read `CLOUDFLARE_ACCOUNT_ID`
- Read `CLOUDFLARE_EMAIL_API_TOKEN`
- Read `NEWSLETTER_FROM_EMAIL`
- Read `NEWSLETTER_FROM_NAME`
- Send HTML and plain text email
- Throw a useful error if Cloudflare returns a non-2xx response
- Never log secrets
- Return the Cloudflare JSON response

MongoDB:

Create a cached MongoDB client helper:

```txt
lib/mongodb.ts
```

Use the official `mongodb` package.

Create a subscribers collection:

```txt
subscribers
```

Subscriber document shape:

```ts
type Subscriber = {
  email: string;
  status: "subscribed" | "unsubscribed";
  source: "homepage" | "blog" | "unknown";
  subscribedAt: Date;
  unsubscribedAt?: Date;
  updatedAt: Date;
  unsubscribeToken: string;
  welcomeEmailSentAt?: Date;
};
```

Ensure:

- Email is normalized with `trim().toLowerCase()`
- Email has a unique index
- `unsubscribeToken` exists and is random/unguessable
- If an unsubscribed user signs up again, set status back to `"subscribed"`
- If an already subscribed user signs up again, do not duplicate the record
- Still return success for repeated signup
- Prefer not to send duplicate welcome emails repeatedly to the same already-subscribed address. Send welcome email on first signup or when resubscribing from unsubscribed state.

Newsletter API routes:

Create:

```txt
/api/newsletter/subscribe
/api/newsletter/unsubscribe
```

If using App Router, use:

```txt
app/api/newsletter/subscribe/route.ts
app/api/newsletter/unsubscribe/route.ts
```

If using Pages Router, use equivalent files under `pages/api`.

Subscribe route:

Method: `POST`

Input:

```ts
{
  email: string
  source?: "homepage" | "blog",
  website?: string
}
```

`website` is a honeypot field. If it is present and non-empty, silently return success without saving or sending email.

Validation:

- Email is required
- Email must be valid enough for normal use
- Return `400` with a minimal error message if invalid

Behavior:

- Save/update subscriber in MongoDB
- Send welcome email using Cloudflare Email Service
- Return JSON:

```ts
{ ok: true, message: "You're on the list." }
```

Unsubscribe route:

Support both:

```txt
GET /api/newsletter/unsubscribe?email=...&token=...
POST /api/newsletter/unsubscribe
```

For GET:

- Validate email and token
- If valid, mark subscriber as unsubscribed
- Return a minimal black-and-white HTML page that matches the site theme:

```txt
You’re unsubscribed.
You won’t receive new post emails anymore.
```

For POST:

- Support one-click unsubscribe behavior for email clients
- Accept email/token from URL or body
- Mark as unsubscribed if valid
- Return JSON `{ ok: true }`

Welcome email:

Subject:

```txt
You’re on the list
```

HTML theme:

- Must be extremely minimal
- White background
- Black text
- Light grey secondary text
- Inline CSS only
- Max width around 560px
- No images
- No colors beyond black/white/grey
- No big buttons
- Use a simple underlined text link

Welcome email copy:

```txt
You’re on the list.

Thanks for joining. I’ll send you new posts when I publish them.

Read the blog:
https://calebareeveso.com/blog

— Caleb
```

The HTML should look conceptually like:

```html
<div
  style="margin:0;padding:40px 20px;background:#fff;color:#000;font-family:Arial,Helvetica,sans-serif;"
>
  <div style="max-width:560px;margin:0 auto;">
    <p
      style="font-size:12px;letter-spacing:.02em;text-transform:uppercase;margin:0 0 32px 0;color:#000;"
    >
      Caleb Areeveso
    </p>
    <h1
      style="font-size:20px;font-weight:400;line-height:1.3;margin:0 0 20px 0;color:#000;"
    >
      You’re on the list.
    </h1>
    <p style="font-size:14px;line-height:1.7;margin:0 0 16px 0;color:#777;">
      Thanks for joining. I’ll send you new posts when I publish them.
    </p>
    <p style="font-size:14px;line-height:1.7;margin:0 0 32px 0;color:#777;">
      <a
        href="https://calebareeveso.com/blog"
        style="color:#000;text-decoration:underline;"
        >Read the blog</a
      >
    </p>
    <p style="font-size:14px;line-height:1.7;margin:0;color:#777;">— Caleb</p>
  </div>
</div>
```

Do not hardcode the site URL in implementation. Use `NEXT_PUBLIC_SITE_URL`.

Post notification email:

Implement a reusable helper for future use:

```txt
lib/email/post-email.ts
```

It should generate a minimal HTML email for a new post.

Subject:

```txt
New post: {post.title}
```

Copy:

```txt
New post.

{post.title}

{post.description}

Read:
{postUrl}

Unsubscribe:
{unsubscribeUrl}
```

When sending post emails, send one email per subscriber, not one bulk email with everyone in `to`.

Include headers:

```ts
{
  "List-Unsubscribe": `<${unsubscribeUrl}>`,
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
}
```

Homepage changes:

Find the existing homepage implementation.

Replace the current projects/hustles section with a Newsletter section and Latest Writing section.

The newsletter section must have:

```tsx
<section id="newsletter">
```

Also add `scroll-margin-top` if needed so the hash scroll lands cleanly.

Ensure this URL works:

```txt
https://calebareeveso.com#newsletter
```

Any internal link to the newsletter should use:

```tsx
<a href="/#newsletter">newsletter</a>
```

Newsletter section content:

```txt
Newsletter
Short notes on building products, design, code, and small internet things.

[email input] [Join]

No spam. Just new posts when I publish.
```

The input and button should match the existing site:

- Thin border
- White background
- Black text
- Small type
- No rounded-pill SaaS style unless the current site already uses it
- Minimal success/error messages
- No color states

Implement a client component:

```txt
components/newsletter-form.tsx
```

Behavior:

- Email input
- Hidden honeypot input named `website`
- Submit to `/api/newsletter/subscribe`
- Loading state
- Success message: `You're on the list.`
- Error message: `Couldn’t join. Try again.`
- Keep UI minimal
- Make it accessible with a real label, even if visually minimal

Latest Writing section:

Show the latest 3 published posts from local MDX files.

If there are no posts yet, show a subtle line:

```txt
No posts yet.
```

Blog content storage:

Use this folder:

```txt
content/posts
```

Each post should be an `.mdx` file:

```txt
content/posts/example-post.mdx
```

Required frontmatter:

```mdx
---
title: "Example Post"
slug: "example-post"
description: "A short description of the post."
date: "2026-06-05"
published: true
---

# Example Post

Write MDX here.
```

Create at least one starter/example MDX post so `/blog` is not empty. Make it minimal and clearly editable.

Post fields:

```ts
type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
  filePath: string;
  content: string;
};
```

Create:

```txt
lib/posts.ts
```

It should:

- Read files from `content/posts`
- Parse frontmatter
- Validate required fields
- Ignore unpublished posts in production blog listing
- Sort posts by date descending
- Provide:
  - `getAllPosts()`
  - `getPublishedPosts()`
  - `getPostBySlug(slug)`
  - `getLatestPosts(limit)`

MDX rendering:

Posts must support MDX and must allow importing React components from the codebase inside MDX files.

Use an MDX setup that supports MDX imports from local project files. If the project already has a working MDX setup, reuse it. Otherwise install and configure a suitable MDX bundling approach.

Preferred implementation if no MDX solution exists:

- Use `mdx-bundler` or another reliable build-time MDX bundler that supports imports
- Configure it so imports like this can work inside MDX:

```mdx
import Note from "@/components/mdx/note";

<Note>This is a custom React component inside a post.</Note>
```

Create a minimal reusable MDX component:

```txt
components/mdx/note.tsx
```

It should render as a simple bordered block:

- Thin grey border
- Small text
- No colors beyond black/grey/white

Blog routes:

Create `/blog`.

The `/blog` page should:

- Match the minimal site style
- Use a narrow content column
- List published posts
- Sort newest first
- Show date, title, description
- Link each title to `/blog/[slug]`
- Include a link back to `/`
- Include a link to `/#newsletter`
- No thumbnails, no cards, no heavy UI

Suggested layout:

```txt
BLOG

01  Building My Newsletter
    2026.06.05
    A short note on building a local-first writing workflow.

02  Designing for Almost Nothing
    2026.05.22
    Notes on black, white, spacing, and restraint.

Newsletter →
Home →
```

Create `/blog/[slug]`.

The post page should:

- Render the MDX content
- Show title, date, description
- Match minimal site style
- Have restrained typography for prose
- Use black text and grey secondary text
- Include link back to `/blog`
- Include link to `/#newsletter`
- Generate static params where applicable
- Return 404 for missing/unpublished posts
- Add metadata from frontmatter if the project uses metadata

Local-only dev editor:

Create:

```txt
/dev/editor
```

If using App Router:

```txt
app/dev/editor/page.tsx
```

This page must only be accessible when:

```ts
process.env.NODE_ENV !== "production" &&
  process.env.DEV_EDITOR_ENABLED === "true";
```

If not enabled, return 404/notFound.

Also guard every dev API route with the same check. Do not rely only on hiding the page.

Editor UI:

- Minimal black-and-white interface matching the website
- Form fields:
  - title
  - slug
  - description
  - date
  - published boolean
  - MDX content textarea

- Buttons:
  - Save
  - Publish

- Show minimal status messages
- No rich WYSIWYG needed
- It is okay for the editor to be a textarea-based MDX editor
- The saved post can be previewed by visiting `/blog/[slug]` locally
- Add a small note that React components can be imported in the MDX body

When title changes, auto-suggest slug, but allow manual slug editing.

Dev API routes:

Create:

```txt
/api/dev/posts/save
/api/dev/posts/publish
```

Save route:

- Dev-only guard
- Method: POST
- Input:

```ts
{
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
  content: string;
}
```

- Validate all fields
- Sanitize slug to lowercase kebab-case
- Prevent path traversal
- Write file to:

```txt
content/posts/{slug}.mdx
```

- File format:

```mdx
---
title: "{title}"
slug: "{slug}"
description: "{description}"
date: "{date}"
published: true
---

{content}
```

- Escape frontmatter safely
- Return JSON:

```ts
{
  ok: true,
  slug: string,
  filePath: string
}
```

Publish route:

- Dev-only guard
- Method: POST
- Input can be the same as save route
- First save the post
- Then run:

```txt
scripts/publish-post.sh content/posts/{slug}.mdx "{title}"
```

- Use Node `child_process` safely
- Do not use shell interpolation with unsanitized input
- Use `spawn` or `execFile`
- Capture stdout/stderr
- Return JSON success/failure
- If git commit fails because there are no changes, return a clear message

Bash script:

Create:

```txt
scripts/publish-post.sh
```

Script behavior:

```bash
#!/usr/bin/env bash
set -euo pipefail

POST_FILE="$1"
TITLE="$2"

if [ ! -f "$POST_FILE" ]; then
  echo "Post file does not exist: $POST_FILE"
  exit 1
fi

git add "$POST_FILE"

if git diff --cached --quiet; then
  echo "No changes to publish."
  exit 0
fi

git commit -m "Publish post: $TITLE"
git push origin main
```

Make it executable if possible.

Do not send post notification emails automatically from the dev editor unless there is already a safe deployment-complete hook in the project. Instead, implement the email helper and leave a clear internal function ready to call after deployment. The reason: emails should link to the deployed post, not a post that is still building.

Optional but useful:

- Add an internal API route `/api/newsletter/send-post` protected by a secret env var `NEWSLETTER_SEND_SECRET`, or skip it if that would add too much risk.
- If implemented, it must require the secret and send only to active subscribers.

Security requirements:

- Never expose the dev editor in production
- Never expose filesystem write APIs in production
- Never expose bash execution in production
- Never commit real secrets
- Validate email input
- Normalize subscriber emails
- Add honeypot field
- Use unsubscribe tokens
- Send one email per subscriber for post notifications
- Include plain text email versions
- Include unsubscribe links in post notification emails
- Do not allow path traversal when saving posts
- Do not execute unsanitized shell commands

Styling requirements:

Use the existing style system. Do not introduce a UI library.

Everything should feel like the current website:

- Minimal
- Sparse
- Black and white
- Light grey secondary text
- Thin borders
- Small text
- Numbered sections
- No cards unless the current design already uses them
- No big CTA button
- No colors
- No rounded colorful badges
- No marketing page feeling

Add CSS only where necessary. Prefer existing classes/utilities.

Dependencies:

Before installing anything, inspect `package.json`.

If missing, add only what is necessary:

- `mongodb`
- `gray-matter`
- MDX bundling/rendering package that supports local imports
- Small validation helper only if the project already uses one; otherwise write simple validation manually

Do not add a database ORM unless the project already uses one.

Implementation order:

1. Inspect project structure.
2. Identify App Router vs Pages Router.
3. Add MongoDB helper.
4. Add Cloudflare email helper.
5. Add email templates for welcome and post notification.
6. Add subscribe/unsubscribe API routes.
7. Add post reading/parsing utilities.
8. Add MDX rendering support.
9. Add `/blog` and `/blog/[slug]`.
10. Add starter post.
11. Add newsletter form component.
12. Update homepage by replacing projects/hustles with newsletter and latest writing.
13. Add `id="newsletter"` to the newsletter section.
14. Add local-only dev editor.
15. Add dev-only save/publish API routes.
16. Add publish bash script.
17. Add/update `.env.example`.
18. Run lint/typecheck/build if available.
19. Fix errors.
20. Provide a concise final summary of changed files and commands run.

Acceptance criteria:

- Visiting `/` shows the original minimal personal site style with the projects/hustles section replaced by Newsletter and Latest Writing.
- Visiting `/#newsletter` scrolls to the newsletter section.
- Visiting `https://calebareeveso.com#newsletter` works after deployment.
- Newsletter signup posts to MongoDB.
- Welcome email sends through Cloudflare Email Service REST API.
- Email HTML is minimal and matches the site.
- `/blog` lists published MDX posts.
- `/blog/[slug]` renders MDX posts.
- MDX posts can import React components from the codebase.
- `/dev/editor` works only locally when `DEV_EDITOR_ENABLED=true`.
- `/dev/editor` is inaccessible in production.
- Save writes to `content/posts/{slug}.mdx`.
- Publish saves, commits, and pushes the MDX file using `scripts/publish-post.sh`.
- No secrets are committed.
- Project builds successfully.
