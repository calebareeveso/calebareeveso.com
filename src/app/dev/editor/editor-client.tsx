"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { markdown } from "@codemirror/lang-markdown";
import MdxContent from "@/components/mdx/mdx-content";
import EmailModal from "./email-modal";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

function slugify(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const STARTER = `import Note from "@/components/mdx/note";

Write your post here in MDX.

<Note>You can import and use React components from the codebase.</Note>
`;

type Draft = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  writing: boolean;
  content: string;
  updatedAt: string;
};

type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  writing: boolean;
  content: string;
};

const cmExtensions = [markdown()];

export default function EditorClient() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(today());
  const [published, setPublished] = useState(true);
  const [writing, setWriting] = useState(false);
  const [content, setContent] = useState(STARTER);

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [posts, setPosts] = useState<PostSummary[]>([]);

  const [preview, setPreview] = useState(false);
  const [previewCode, setPreviewCode] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  const loadedRef = useRef(false);

  const upsertDraft = useCallback((draft: Draft) => {
    setDrafts((prev) => {
      const rest = prev.filter((d) => d.slug !== draft.slug);
      return [draft, ...rest].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
    });
  }, []);

  const refreshPosts = useCallback(async () => {
    const res = await fetch("/api/dev/posts");
    const data = await res.json();
    if (data.ok) setPosts(data.posts);
  }, []);

  function applyFields(d: {
    title: string;
    slug: string;
    description: string;
    date: string;
    published: boolean;
    writing: boolean;
    content: string;
  }) {
    setTitle(d.title);
    setSlug(d.slug);
    setSlugEdited(true);
    setDescription(d.description);
    setDate(d.date || today());
    setPublished(d.published);
    setWriting(d.writing);
    setContent(d.content);
    setPreview(false);
    setPreviewCode(null);
    setPreviewError(null);
  }

  // Initial load: pull drafts + posts, and restore the most recent draft so
  // nothing is lost across reloads.
  useEffect(() => {
    (async () => {
      const [dRes, pRes] = await Promise.all([
        fetch("/api/dev/drafts"),
        fetch("/api/dev/posts"),
      ]);
      const dData = await dRes.json();
      const pData = await pRes.json();
      if (pData.ok) setPosts(pData.posts);
      if (dData.ok) {
        setDrafts(dData.drafts);
        if (dData.drafts.length > 0) applyFields(dData.drafts[0]);
      }
      loadedRef.current = true;
    })();
  }, []);

  // Debounced autosave to a local draft file (keyed by slug).
  useEffect(() => {
    if (!loadedRef.current) return;
    const s = slugify(slug);
    if (!s) return;
    const handle = setTimeout(async () => {
      try {
        const res = await fetch("/api/dev/drafts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: s, title, description, date, published, writing, content }),
        });
        const data = await res.json();
        if (data.ok) upsertDraft(data.draft);
      } catch {
        /* autosave is best-effort */
      }
    }, 800);
    return () => clearTimeout(handle);
  }, [title, slug, description, date, published, writing, content, upsertDraft]);

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  function newDraft() {
    setTitle("");
    setSlug("");
    setSlugEdited(false);
    setDescription("");
    setDate(today());
    setPublished(true);
    setWriting(false);
    setContent(STARTER);
    setPreview(false);
    setPreviewCode(null);
    setPreviewError(null);
    setStatus("New draft.");
  }

  function loadDraft(d: Draft) {
    applyFields(d);
    setStatus(`Loaded draft: ${d.slug}`);
  }

  function loadPost(p: PostSummary) {
    // Prefer a local draft of the same slug (holds the real body for writing posts).
    const draft = drafts.find((d) => d.slug === p.slug);
    if (draft) {
      loadDraft(draft);
      return;
    }
    applyFields(p);
    setStatus(`Loaded post: ${p.slug}`);
  }

  async function saveDraftNow() {
    const s = slugify(slug);
    if (!s) {
      setStatus("Add a slug to save a draft.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/dev/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: s, title, description, date, published, writing, content }),
      });
      const data = await res.json();
      if (data.ok) {
        upsertDraft(data.draft);
        setStatus("Draft saved.");
      } else {
        setStatus(data.error || "Couldn't save draft.");
      }
    } catch {
      setStatus("Request failed.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteDraftBySlug(s: string, e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await fetch(`/api/dev/drafts?slug=${encodeURIComponent(s)}`, { method: "DELETE" });
      setDrafts((prev) => prev.filter((d) => d.slug !== s));
      setStatus(`Deleted draft: ${s}`);
    } catch {
      setStatus("Request failed.");
    }
  }

  async function togglePreview() {
    if (preview) {
      setPreview(false);
      return;
    }
    setBusy(true);
    setStatus("Rendering preview…");
    try {
      const res = await fetch("/api/dev/posts/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (data.ok) {
        setPreviewCode(data.code);
        setPreviewError(null);
      } else {
        setPreviewCode(null);
        setPreviewError(data.error || "Preview failed.");
      }
      setPreview(true);
      setStatus("");
    } catch {
      setPreviewError("Preview request failed.");
      setPreview(true);
      setStatus("");
    } finally {
      setBusy(false);
    }
  }

  async function publish() {
    setBusy(true);
    setStatus(writing ? "Publishing title…" : "Publishing…");
    try {
      const res = await fetch("/api/dev/posts/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, description, date, published, writing, content }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus(data.error || "Something went wrong.");
      } else {
        setStatus(data.message || `Published /blog/${data.slug}`);
        await refreshPosts();
      }
    } catch {
      setStatus("Request failed.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteCurrent() {
    const s = slugify(slug);
    if (!s) {
      setStatus("Nothing to delete.");
      return;
    }
    if (!window.confirm(`Delete "${title || s}"? This removes the post file and pushes the deletion if it was published.`)) {
      return;
    }
    setBusy(true);
    setStatus("Deleting…");
    try {
      const res = await fetch("/api/dev/posts/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: s, title }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus(data.error || "Couldn't delete.");
        return;
      }
      setPosts((prev) => prev.filter((p) => p.slug !== s));
      setDrafts((prev) => prev.filter((d) => d.slug !== s));
      newDraft();
      setStatus(data.message || "Deleted.");
    } catch {
      setStatus("Request failed.");
    } finally {
      setBusy(false);
    }
  }

  const btn =
    "text-base text-secondary/60 hover:text-primary transition-colors duration-300 border border-secondary/10 rounded-md px-3 py-1 disabled:opacity-50";
  const field =
    "bg-white text-primary text-base border border-secondary/10 rounded-md px-2 py-1 outline-none focus:border-secondary/30 transition-colors duration-300 w-full";

  return (
    <div className="h-screen flex flex-col text-secondary">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 border-b border-secondary/10 px-4 py-2">
        <div className="flex items-center gap-4">
          <p className="text-base font-mono text-black">EDITOR</p>
          <label className="flex items-center gap-1.5 text-base">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            Published
          </label>
          <label className="flex items-center gap-1.5 text-base">
            <input type="checkbox" checked={writing} onChange={(e) => setWriting(e.target.checked)} />
            Writing
          </label>
          {writing && (
            <span className="text-[12.5px] text-secondary/60">Publish pushes the title only.</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {status && <span className="text-[12.5px] text-secondary/60">{status}</span>}
          <button className={btn} onClick={newDraft} disabled={busy}>New</button>
          <button className={btn} onClick={saveDraftNow} disabled={busy}>Save draft</button>
          <button className={btn} onClick={togglePreview} disabled={busy}>
            {preview ? "Edit" : "Preview"}
          </button>
          <button className={btn} onClick={publish} disabled={busy}>Publish</button>
          <button className={btn} onClick={() => setEmailOpen(true)} disabled={busy}>Email</button>
          <button className={btn} onClick={deleteCurrent} disabled={busy}>Delete</button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-secondary/10 overflow-y-auto p-3 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[12.5px] font-mono uppercase text-secondary/60">Drafts</p>
            {drafts.length === 0 ? (
              <p className="text-[12.5px] text-secondary/40">No drafts.</p>
            ) : (
              drafts.map((d) => (
                <button
                  key={d.slug}
                  onClick={() => loadDraft(d)}
                  className="group flex items-center justify-between gap-2 text-left text-base text-black hover:text-primary"
                >
                  <span className="truncate">{d.title || d.slug}</span>
                  <span
                    onClick={(e) => deleteDraftBySlug(d.slug, e)}
                    className="text-secondary/40 hover:text-primary opacity-0 group-hover:opacity-100"
                    aria-label={`Delete draft ${d.slug}`}
                  >
                    ×
                  </span>
                </button>
              ))
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[12.5px] font-mono uppercase text-secondary/60">Posts</p>
            {posts.length === 0 ? (
              <p className="text-[12.5px] text-secondary/40">No posts.</p>
            ) : (
              posts.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => loadPost(p)}
                  className="flex items-center gap-2 text-left text-base text-black hover:text-primary"
                >
                  <span className="truncate">{p.title || p.slug}</span>
                  {p.writing && (
                    <span className="text-[10px] font-mono uppercase text-secondary/40 shrink-0">w</span>
                  )}
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-h-0">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 border-b border-secondary/10 p-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12.5px] text-secondary/60" htmlFor="title">Title</label>
              <input id="title" className={field} value={title} onChange={(e) => onTitleChange(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12.5px] text-secondary/60" htmlFor="slug">Slug</label>
              <input
                id="slug"
                className={field}
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12.5px] text-secondary/60" htmlFor="description">Description</label>
              <input id="description" className={field} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12.5px] text-secondary/60" htmlFor="date">Date</label>
              <input id="date" type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          {/* Editor / Preview */}
          <div className="flex-1 min-h-0 overflow-auto">
            {preview ? (
              <div className="mx-auto w-full max-w-6xl">
                {previewError ? (
                  <pre className="mx-auto max-w-xl whitespace-pre-wrap px-4 py-8 font-mono text-[12.5px] text-secondary">{previewError}</pre>
                ) : previewCode ? (
                  <MdxContent code={previewCode} />
                ) : (
                  <p className="mx-auto max-w-xl px-4 py-8 text-base text-secondary/60">Nothing to preview.</p>
                )}
              </div>
            ) : (
              <CodeMirror
                value={content}
                onChange={(value) => setContent(value)}
                extensions={cmExtensions}
                height="100%"
                className="h-full text-[13px]"
                basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
              />
            )}
          </div>
        </main>
      </div>

      {emailOpen && (
        <EmailModal
          onClose={() => setEmailOpen(false)}
          title={title}
          description={description}
          slug={slug}
          writing={writing}
        />
      )}
    </div>
  );
}
