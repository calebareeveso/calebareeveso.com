import { notFound } from "next/navigation";
import { isDevEditorEnabled } from "@/lib/dev-guard";
import EditorClient from "./editor-client";

export const dynamic = "force-dynamic";

export default function DevEditorPage() {
  if (!isDevEditorEnabled()) notFound();
  return <EditorClient />;
}
