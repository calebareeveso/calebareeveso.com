import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Default element styling for MDX prose — restrained, black text with grey
 * secondary tones to match the site. Components imported inside an MDX file
 * are bundled directly and don't need to be listed here.
 */
export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-lg text-black mt-8 mb-3" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-base text-black mt-8 mb-3" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-base text-black mt-6 mb-2" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-base text-secondary leading-relaxed my-4" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => (
    <Link
      href={href}
      className="text-black underline underline-offset-2 hover:text-primary transition-colors duration-300"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-5 my-4 text-secondary flex flex-col gap-1" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-5 my-4 text-secondary flex flex-col gap-1" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="text-base leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-secondary/30 py-1 pl-4 text-black italic [&>p]:my-0"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="font-mono text-[12.5px] bg-primaryGray px-1 py-0.5 rounded"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="font-mono text-[12.5px] bg-primaryGray border border-secondary/10 rounded-md p-3 my-4 overflow-x-auto"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="border-secondary/10 my-8" {...props} />
  ),
};
