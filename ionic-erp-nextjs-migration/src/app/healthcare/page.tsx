import type { Metadata } from "next";
import HealthCare from "@/site/healthCare/HealthCare";

export const metadata: Metadata = {
  title: "হেলথকেয়ার ইআরপি",
  description: "স্বাস্থ্যসেবা প্রতিষ্ঠানের জন্য আইওনিক ইআরপি টোটাল সলুয়েশন।",
};

export default function HealthcarePage() {
  return <HealthCare />;
}
