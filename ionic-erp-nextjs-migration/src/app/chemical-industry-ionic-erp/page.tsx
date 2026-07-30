import type { Metadata } from "next";
import Chemical from "@/site/chemical-industry/Chemical";

export const metadata: Metadata = {
  title: "কেমিক্যাল ইন্ডাস্ট্রি ইআরপি",
  description: "রাসায়নিক শিল্পের জন্য আইওনিক ইআরপি টোটাল সলুয়েশন।",
};

export default function ChemicalPage() {
  return <Chemical />;
}
