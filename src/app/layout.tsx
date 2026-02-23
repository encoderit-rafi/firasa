import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/blocks/footer";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIRASA",
  description: "AI Face Personality Score.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${inter.variable} relative`}>
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
