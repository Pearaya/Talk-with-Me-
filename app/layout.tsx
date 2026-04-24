import type { Metadata } from "next";
import { Sarabun, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coaching Platform",
  description: "Management Coaching Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${sarabun.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
