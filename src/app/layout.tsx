import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/blocks/footer";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import "@/utlis/i18n";
import LanguageProvider from "@/providers/language-provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "FIRASA",
  description: "AI Face Personality Score.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${roboto.variable} ${inter.variable} relative`}>
        <QueryProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster richColors position="top-right" />
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
