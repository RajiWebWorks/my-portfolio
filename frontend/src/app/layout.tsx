import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rajeshwari - Portfolio",
  description: "Web Developer Portfolio",
  // Add more metadata for better SEO
  metadataBase: new URL('https://your-production-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/og-image.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}>
        {/* No whitespace between these elements to prevent hydration errors */}
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}