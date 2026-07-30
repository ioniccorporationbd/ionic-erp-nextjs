import type { Metadata } from "next";
import Loan from "@/site/loan/Loan";

export const metadata: Metadata = {
  title: "লোন ম্যানেজমেন্ট ইআরপি",
  description: "ঋণ ব্যবস্থাপনার জন্য আইওনিক ইআরপি বিজনেস ম্যানেজমেন্ট সফটওয়্যার।",
};

export default function LoanPage() {
  return <Loan />;
}
