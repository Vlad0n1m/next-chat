import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "l0xa1-chat",
  description: "Chat for l0xa1's friends and subs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-b from-slate-900 to-indigo-900 min-h-screen text-white ${inter.className}`}>
        <div className="max-w-[1360px] px-[10px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
