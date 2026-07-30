import type { Metadata } from "next";
import TradingErp from "@/site/tradingErp/TradingErp";

export const metadata: Metadata = {
  title: "ট্রেডিং ইআরপি",
  description: "ট্রেডিং ব্যবসার জন্য আইওনিক ইআরপি বিজনেস ম্যানেজমেন্ট সফটওয়্যার।",
};

export default function TradingPage() {
  return <TradingErp />;
}
