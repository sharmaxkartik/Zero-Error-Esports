import type React from "react";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import ClientLayout from "@/components/client-layout";
import "./globals.css";

// Font configuration - Rajdhani is a good gaming font
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zero Error Esports | Professional Gaming Team",
  description:
    "Official website of Zero Error Esports - Professional gaming team competing at the highest level",
};

export default function RootLayout({
  children,
  isLoading,
}: Readonly<{
  children: React.ReactNode;
  isLoading: boolean;
}>) {
  return (
    <html lang="en">
      <body className={rajdhani.className}>
        <ClientLayout isLoading={isLoading}>{children}</ClientLayout>
      </body>
    </html>
  );
}
