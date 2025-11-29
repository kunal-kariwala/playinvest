import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "PlayInvest by Groww - Learn Investing",
  description: "Learn investing with fake money, real knowledge. A beginner-friendly platform to understand investing concepts and practice with virtual money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
