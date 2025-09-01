import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "@/components/ui/sonner";
import Web3Provider from "@/providers/Web3Provider";
import Navbar from "@/components/fragments/navbar";
import { Footer } from "@/components/fragments/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TipMe",
    description: "Every tip is a chance to make my day better.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <Web3Provider>
        <html lang="en">
            <body
                className={`${dmSans.className} antialiased relative min-h-[100dvh] bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]`}
            >
                <Navbar />
                <main className="py-8 px-6 h-dvh">
                    {children}
                </main>
                <Toaster />
                <Footer />
            </body>
        </html>
      </Web3Provider>
    );
}
