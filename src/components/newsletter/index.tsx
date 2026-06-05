import Link from "next/link";
import NewsletterForm from "@/components/newsletter-form";
import { getLatestPosts } from "@/lib/posts";

function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}

export default function Newsletter() {
  const posts = getLatestPosts(3);

  return (
    <div className="flex flex-col gap-6">
      {/* 08 */}
      <section id="newsletter" className="scroll-mt-8">
        <div className="flex items-start gap-4">
          <div>
            <p className="text-base font-mono text-secondary">08</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-base text-black">Newsletter</p>
            <h2 className="text-base mt-2 text-secondary">
              Short notes on what I&apos;m learning at Google.
            </h2>
            <div className="mt-2">
              <NewsletterForm source="homepage" />
            </div>
            <p className="text-base text-secondary/60 mt-1">
              No spam. Just new posts when I publish.
            </p>
          </div>
        </div>
      </section>

      {/* 09 */}
      <div className="flex items-start gap-4">
        <div>
          <p className="text-base font-mono text-secondary">09</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-base text-black">Latest Writing</p>
          {posts.length === 0 ? (
            <h2 className="text-base mt-2 text-secondary/60">No posts yet.</h2>
          ) : (
            <div className="flex flex-col gap-4 mt-2">
              {posts.map((post) => (
                <div key={post.slug} className="flex flex-col gap-0.5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-base text-black hover:text-primary transition-colors duration-300"
                  >
                    {post.title}
                  </Link>
                  <p className="text-[12.5px] font-mono text-secondary/60">
                    {formatDate(post.date)}
                  </p>
                  <p className="text-base text-secondary">{post.description}</p>
                </div>
              ))}
            </div>
          )}
          <h2 className="text-base mt-2 text-secondary gap-2">
            <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/60 border-secondary/10 px-1 py-0.5 rounded-md">
              <Link href="/blog">read the blog</Link>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
