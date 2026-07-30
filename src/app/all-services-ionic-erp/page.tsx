import type { Metadata } from "next";
import Services from "@/site/Services";

export const metadata: Metadata = {
  title: "সকল সেবা",
  description: "আইওনিক ইআরপি পরামর্শ, ডেভেলপমেন্ট, কাস্টমাইজেশন, বাস্তবায়ন, সাপোর্ট ও প্রশিক্ষণ।",
};

export default function ServicesPage() {
  return (
    <Services
      title={'  "আইওনিক ইআরপি" এর কাস্টম ক্লাউড-ভিত্তিক ইআরপি সফ্টওয়্যার সমস্ত সেবা সমূহ'}
      subTitle={
        <>
          আপনার ব্যবসার জন্য বিশেষভাবে তৈরি “আইওনিক ইআরপি” সফ্টওয়্যার-
          কাস্টম ইআরপি সমাধান তৈরি করে যা কর্মপ্রবাহকে স্ট্রীমলাইন করার উপর
          মনোযোগ দিয়ে আপনার <br /> অনন্য ব্যবসার প্রয়োজনীয়তা পূরণ করে।
        </>
      }
    />
  );
}
