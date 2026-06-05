/**
 * The dev editor and its filesystem/bash APIs must NEVER be reachable in a
 * hosted/production build. Gate both the page and every dev API route on this.
 */
export function isDevEditorEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_EDITOR_ENABLED === "true"
  );
}
