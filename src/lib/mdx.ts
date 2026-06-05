import path from "path";
import { bundleMDX } from "mdx-bundler";

const SRC_DIR = path.join(process.cwd(), "src");
const CONTENT_CWD = path.join(process.cwd(), "content/posts");

/**
 * Bundle an MDX source string into runnable code.
 *
 * - `cwd` points at the posts directory so relative imports resolve there.
 * - The `@` esbuild alias mirrors the tsconfig path alias so posts can
 *   `import X from "@/components/..."` from anywhere in the codebase.
 *
 * Runs at build time (blog pages are statically generated), so esbuild reads
 * the local filesystem directly.
 */
export async function bundlePost(source: string) {
  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: CONTENT_CWD,
    esbuildOptions(options) {
      options.alias = {
        ...(options.alias ?? {}),
        "@": SRC_DIR,
      };
      return options;
    },
  });

  return { code, frontmatter };
}
