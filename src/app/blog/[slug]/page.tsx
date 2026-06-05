import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { bundlePost } from "@/lib/mdx";
import { postSourceUrl } from "@/lib/site";
import MdxContent from "@/components/mdx/mdx-content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Caleb Areeveso`,
    description: post.description,
  };
}

function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Writing posts withhold their body until a full publish.
  const code = post.writing ? null : (await bundlePost(post.content)).code;

  return (
    <div className="wrapper flex justify-center min-h-screen">
      <div className="max-w-xl mx-auto container px-4 py-20">
        <main className="flex flex-col gap-8">
          <header className="flex flex-col gap-2">
            <p className="text-[12.5px] font-mono text-secondary/60">
              {formatDate(post.date)}
              {post.writing && <span className="ml-2 uppercase">· writing</span>}
            </p>
            <h1 className="text-lg text-black">{post.title}</h1>
            <p className="text-base text-secondary">{post.description}</p>
          </header>

          <article className="border-t border-secondary/10 pt-2">
            {code ? (
              <MdxContent code={code} />
            ) : (
              <p className="text-base text-secondary/60 py-4">
                Currently writing — full post coming soon.
              </p>
            )}
          </article>

          <div className="flex justify-between gap-2 border-t border-secondary/10 pt-6">
            <Link
              href="/blog"
              className="text-base text-secondary hover:text-primary transition-colors duration-300"
            >
              Blog
            </Link>
            <a
              href={postSourceUrl(post.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-secondary hover:text-primary transition-colors duration-300"
            >
              See blog code
            </a>
            <Link
              href="/#newsletter"
              className="text-base text-secondary hover:text-primary transition-colors duration-300"
            >
              Newsletter
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
