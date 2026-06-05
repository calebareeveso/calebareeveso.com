export const REPO_URL = "https://github.com/calebareeveso/calebareeveso.com";

/** GitHub link to a post's MDX source on the main branch. */
export function postSourceUrl(slug: string): string {
  return `${REPO_URL}/blob/main/content/posts/${slug}.mdx`;
}
