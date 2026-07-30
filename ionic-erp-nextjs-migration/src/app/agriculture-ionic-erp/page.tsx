import type { Metadata } from "next";
import Agriculture from "@/site/agriculture/Agriculture";

export const metadata: Metadata = {
  title: "কৃষি ইআরপি",
  description: "কৃষি ব্যবসার জন্য আইওনিক ইআরপি বিজনেস ম্যানেজমেন্ট সফটওয়্যার।",
};

export default function AgriculturePage() {
  return <Agriculture />;
}
