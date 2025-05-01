import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rajeshwari - Portfolio", 
  description: "Web Developer Portfolio ", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth"> {/* Added scroll-smooth */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}> {/* Added flex layout */}
          <Header />
          <main className="flex-grow pt-16"> {/* Added padding-top to avoid overlap with fixed header */}
        {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
