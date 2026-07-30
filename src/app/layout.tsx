import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-hindi",
});

export const metadata: Metadata = {
  title: "Loan Policy | World of Personal Finance",
  description:
    "Loan apps, bank accounts, credit cards and personal finance guides in Hindi.",
};

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${body.variable} ${devanagari.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}