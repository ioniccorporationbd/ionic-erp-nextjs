import type { Metadata } from "next";
import Contact from "@/site/Contact";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description: "আইওনিক কর্পোরেশনের গ্রাহক সেবা কেন্দ্র ও অফিসের যোগাযোগের তথ্য।",
};

export default function ContactPage() {
  return <Contact />;
}
