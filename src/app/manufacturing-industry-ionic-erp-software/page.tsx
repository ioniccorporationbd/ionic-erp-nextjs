import type { Metadata } from "next";
import Manufacturing from "@/site/manufacturing/Manufacturing";

export const metadata: Metadata = {
  title: "ম্যানুফ্যাকচারিং ইআরপি",
  description: "উৎপাদন শিল্পের জন্য আইওনিক ইআরপি বিজনেস ম্যানেজমেন্ট সফটওয়্যার।",
};

export default function ManufacturingPage() {
  return <Manufacturing />;
}
