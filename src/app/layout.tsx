import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";

import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Marketplace | The Professional Classifieds Platform",
  description: "Buy, sell, and trade anything in your local community with our secure and professional marketplace platform.",
  keywords: ["marketplace", "classifieds", "buy sell", "local trade", "professional ads"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="animate-fade-in">
        <Providers>
          <Suspense fallback={<div style={{ height: '120px', backgroundColor: '#ffffff' }}></div>}>
            <Header />
          </Suspense>
          <main className="app-container">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
