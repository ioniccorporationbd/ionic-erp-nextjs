import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-36 text-center">
      <p className="text-lg font-semibold text-[#FF0000]">পৃষ্ঠা পাওয়া যায়নি</p>
      <h1 className="mt-3 text-4xl font-bold text-[#001B41]">404</h1>
      <p className="mt-4 text-[#656464]">
        আপনি যে পাতাটি খুঁজছেন সেটি এই ওয়েবসাইটে নেই।
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[#FFAA00] px-6 py-2 font-bold text-[#001B41]"
      >
        হোম পেজে ফিরুন
      </Link>
    </section>
  );
}
