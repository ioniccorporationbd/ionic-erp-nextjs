import type { ReactNode } from "react";

export default function TutorialLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <section lang="en">{children}</section>;
}
