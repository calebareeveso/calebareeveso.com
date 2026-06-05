"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({
  source = "homepage",
}: {
  source?: "homepage" | "blog";
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [pulse, setPulse] = useState(false);

  // When the page is reached via #newsletter, draw attention to the input with
  // a shockwave until the visitor starts entering their email.
  useEffect(() => {
    function check() {
      if (window.location.hash === "#newsletter") setPulse(true);
    }
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
      <div className="flex items-center gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className={`relative flex-1 ${pulse ? "newsletter-ripple-on" : ""}`}>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setPulse(false);
            }}
            onFocus={() => setPulse(false)}
            disabled={status === "loading"}
            className="relative z-10 w-full bg-white text-primary text-base border-[1px] border-secondary/10 rounded-md px-2 py-1 outline-none focus:border-secondary/30 transition-colors duration-300 disabled:opacity-50"
          />
        </div>
        {/* Honeypot — hidden from real users, tempting to bots. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
        >
          <label htmlFor="newsletter-website">Website</label>
          <input
            id="newsletter-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-base hover:opacity-60 bg-primary text-white border-[1px] border-secondary/10 rounded-md px-2 py-1 disabled:opacity-50"
        >
          {status === "loading" ? "…" : "Join"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-base text-secondary">You&apos;re on the list.</p>
      )}
      {status === "error" && (
        <p className="text-base text-secondary">
          Couldn&apos;t join. Try again.
        </p>
      )}
    </form>
  );
}
