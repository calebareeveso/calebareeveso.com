"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { html as htmlLang } from "@codemirror/lang-html";
import { buildPostEmail } from "@/lib/email/post-email";
import { buildWritingEmail } from "@/lib/email/writing-email";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });
const cmExtensions = [htmlLang()];

const UNSUB = "{{unsubscribe_url}}";

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://calebareeveso.com").replace(/\/$/, "");
}

type Recipient = { email: string; include: boolean };

type Props = {
  onClose: () => void;
  title: string;
  description: string;
  slug: string;
  writing: boolean;
};

function initialTemplate(writing: boolean, title: string, description: string, slug: string) {
  const postUrl = `${siteUrl()}/blog/${slug || ""}`;
  return writing
    ? buildWritingEmail({ title: title || "Untitled", unsubscribeUrl: UNSUB })
    : buildPostEmail({
        post: { title: title || "Untitled", description },
        postUrl,
        unsubscribeUrl: UNSUB,
      });
}

export default function EmailModal({ onClose, title, description, slug, writing }: Props) {
  // The modal is mounted fresh each time it opens, so initializers capture the
  // current Writing/title state to preload the right template.
  const [subject, setSubject] = useState(() => initialTemplate(writing, title, description, slug).subject);
  const [body, setBody] = useState(() => initialTemplate(writing, title, description, slug).html);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [showRecipients, setShowRecipients] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/dev/subscribers");
        const data = await res.json();
        if (active && data.ok) {
          setRecipients(data.emails.map((email: string) => ({ email, include: true })));
        }
      } catch {
        if (active) setStatus("Couldn't load subscribers.");
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const includedCount = recipients.filter((r) => r.include).length;

  function toggleRecipient(email: string) {
    setRecipients((prev) =>
      prev.map((r) => (r.email === email ? { ...r, include: !r.include } : r)),
    );
  }

  function removeRecipient(email: string) {
    setRecipients((prev) => prev.filter((r) => r.email !== email));
  }

  function addRecipient() {
    const email = newEmail.trim().toLowerCase();
    if (!email) return;
    setRecipients((prev) =>
      prev.some((r) => r.email === email) ? prev : [...prev, { email, include: true }],
    );
    setNewEmail("");
  }

  async function send() {
    const toList = recipients.filter((r) => r.include).map((r) => r.email);
    if (toList.length === 0) {
      setStatus("Add at least one recipient.");
      return;
    }
    setSending(true);
    setStatus(`Sending to ${toList.length}…`);
    try {
      const res = await fetch("/api/dev/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          html: body,
          recipients: toList,
          kind: writing ? "writing" : "published",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus(data.error || "Send failed.");
      } else {
        setStatus(`Sent ${data.sent}/${data.total}${data.failed ? ` · ${data.failed} failed` : ""}.`);
      }
    } catch {
      setStatus("Request failed.");
    } finally {
      setSending(false);
    }
  }

  const btn =
    "text-base text-secondary/60 hover:text-primary transition-colors duration-300 border border-secondary/10 rounded-md px-3 py-1 disabled:opacity-50";
  const field =
    "bg-white text-primary text-base border border-secondary/10 rounded-md px-2 py-1 outline-none focus:border-secondary/30 transition-colors duration-300 w-full";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="flex h-[85vh] w-full max-w-2xl flex-col rounded-md border border-secondary/10 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-secondary/10 px-4 py-2">
          <div className="flex items-center gap-3">
            <p className="text-base font-mono text-black">EMAIL</p>
            <span className="text-[12.5px] uppercase text-secondary/60">
              {writing ? "writing teaser" : "new post"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {status && <span className="text-[12.5px] text-secondary/60">{status}</span>}
            <button className={btn} onClick={() => setPreviewing((p) => !p)} disabled={sending}>
              {previewing ? "Edit" : "Preview"}
            </button>
            <button className={btn} onClick={send} disabled={sending}>Send</button>
            <button className={btn} onClick={onClose} disabled={sending}>Close</button>
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1 border-b border-secondary/10 p-3">
          <label className="text-[12.5px] text-secondary/60" htmlFor="email-subject">Subject</label>
          <input
            id="email-subject"
            className={field}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Recipients */}
        <div className="border-b border-secondary/10 p-3">
          <button
            className="flex items-center gap-2 text-base text-black hover:text-primary"
            onClick={() => setShowRecipients((s) => !s)}
          >
            <span className="font-mono text-[12.5px] text-secondary/60">
              {showRecipients ? "▾" : "▸"}
            </span>
            Recipients ({includedCount})
          </button>
          {showRecipients && (
            <div className="mt-2 flex flex-col gap-1">
              <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
                {recipients.length === 0 ? (
                  <p className="text-[12.5px] text-secondary/40">No subscribers.</p>
                ) : (
                  recipients.map((r) => (
                    <div key={r.email} className="flex items-center gap-2 text-base">
                      <input
                        type="checkbox"
                        checked={r.include}
                        onChange={() => toggleRecipient(r.email)}
                      />
                      <span className="flex-1 truncate text-secondary">{r.email}</span>
                      <button
                        className="text-secondary/40 hover:text-primary"
                        onClick={() => removeRecipient(r.email)}
                        aria-label={`Remove ${r.email}`}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <input
                  className={field}
                  placeholder="add@email.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addRecipient();
                    }
                  }}
                />
                <button className={btn} onClick={addRecipient}>Add</button>
              </div>
              <p className="text-[12.5px] text-secondary/40">
                Edits here affect this send only — the subscriber list isn’t changed.
              </p>
            </div>
          )}
        </div>

        {/* Body: editor / preview */}
        <div className="flex-1 min-h-0 overflow-auto">
          {previewing ? (
            <iframe
              title="Email preview"
              className="h-full w-full"
              srcDoc={body.replace(/\{\{unsubscribe_url\}\}/g, "#")}
            />
          ) : (
            <CodeMirror
              value={body}
              onChange={(value) => setBody(value)}
              extensions={cmExtensions}
              height="100%"
              className="h-full text-[12.5px]"
              basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
