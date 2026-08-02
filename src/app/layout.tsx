import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import NavbarErp from "@/site/shared/NavbarErp";
import Footer from "@/site/shared/Footer";
import ScrollToTop from "@/site/shared/ScrollToTop";
import ContactDialog from "@/components/contact/ContactDialog";

export const metadata: Metadata = {
  title: {
    default: "আইওনিক ইআরপি - টোটাল সলুয়েশন বিজনেস ম্যানেজমেন্ট ইআরপি সফটওয়্যার",
    template: "%s | আইওনিক ইআরপি",
  },
  description:
    "ব্যবসা পরিচালনার জন্য টোটাল সলুয়েশন আইওনিক ইআরপি বিজনেস ম্যানেজমেন্ট সফটওয়্যার।",
  icons: {
    icon: "/assets/erp/ionic-erp-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="site-shell mx-auto max-w-[1920px] bg-[#F3F3F3]">
          <ScrollToTop />
          <div className="marketing-navigation"><NavbarErp /></div>
          <main className="site-main">{children}</main>
          <div className="marketing-footer"><Footer /></div>
          <div className="marketing-dialog"><ContactDialog /></div>
        </div>
      </body>
    </html>
  );
}
