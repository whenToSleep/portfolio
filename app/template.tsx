"use client";

import type { ReactNode } from "react";

// Re-mounts on every navigation so each page's `.view` fade-in (globals.css)
// runs — replicating the prototype's per-page transition.
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
