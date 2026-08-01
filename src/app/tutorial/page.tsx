import type { Metadata } from "next";
import TutorialPage from "@/components/tutorial/TutorialPage";

export const metadata: Metadata = {
  title: "Frappe HR Tutorial",
  description: "Frappe HR documentation and product tutorial.",
};

export default function TutorialRoute() {
  return <TutorialPage />;
}
