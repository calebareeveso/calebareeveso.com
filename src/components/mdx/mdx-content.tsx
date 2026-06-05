"use client";

import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { mdxComponents } from "@/components/mdx";

/* eslint-disable react-hooks/static-components */
// mdx-bundler builds the component at runtime from the bundled code string;
// useMemo keeps it stable across renders. This is the intended pattern, so the
// "components created during render" rule is intentionally disabled here.
export default function MdxContent({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={mdxComponents} />;
}
