"use client";

import { useState } from "react";

function slugify(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const STARTER = `import Note from "@/components/mdx/note";

Write your post here in MDX.

<Note>You can import and use React components from the codebase.</Note>
`;

export default function EditorClient() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState(STARTER);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  async function submit(action: "save" | "publish") {
    setBusy(true);
    setStatus(action === "save" ? "Saving…" : "Publishing…");
    try {
      const res = await fetch(`/api/dev/posts/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, description, date, published, content }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus(data.error || "Something went wrong.");
      } else {
        setStatus(data.message || `Saved to ${data.filePath}. Preview at /blog/${data.slug}`);
      }
    } catch {
      setStatus("Request failed.");
    } finally {
      setBusy(false);
    }
  }

  const field = "bg-white text-primary text-base border-[1px] border-secondary/10 rounded-md px-2 py-1 outline-none focus:border-secondary/30 transition-colors duration-300 w-full";
  const label = "text-base text-black";
  const btn = "text-base text-secondary/60 hover:text-primary transition-colors duration-300 border-[1px] border-secondary/10 rounded-md px-3 py-1 disabled:opacity-50";

  return (
    <div className="wrapper flex justify-center min-h-screen">
      <div className="max-w-xl mx-auto container px-4 py-20">
        <main className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-base font-mono text-black">EDITOR</p>
            <p className="text-base text-secondary/60">Local-only. Writes to content/posts.</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className={label} htmlFor="title">Title</label>
            <input id="title" className={field} value={title} onChange={(e) => onTitleChange(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={label} htmlFor="slug">Slug</label>
            <input
              id="slug"
              className={field}
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={label} htmlFor="description">Description</label>
            <input id="description" className={field} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={label} htmlFor="date">Date</label>
            <input id="date" type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <label className="flex items-center gap-2 text-base text-secondary">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            Published
          </label>

          <div className="flex flex-col gap-1">
            <label className={label} htmlFor="content">MDX content</label>
            <p className="text-[12.5px] text-secondary/60">
              You can <code className="font-mono">import</code> React components from the codebase, e.g. <code className="font-mono">@/components/mdx/note</code>.
            </p>
            <textarea
              id="content"
              className={`${field} font-mono text-[12.5px] min-h-80 leading-relaxed`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button className={btn} disabled={busy} onClick={() => submit("save")}>Save</button>
            <button className={btn} disabled={busy} onClick={() => submit("publish")}>Publish</button>
          </div>

          {status && <p className="text-base text-secondary">{status}</p>}
        </main>
      </div>
    </div>
  );
}
