import type React from "react";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Font configuration - Rajdhani is a good gaming font
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zero Error Esports | Professional Gaming Team",
  description:
    "Official website of Zero Error Esports - Professional gaming team competing at the highest level",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rajdhani.className}>
        {/* Navbar component */}
        <Navbar />

        {/* Main content */}
        <main>{children}</main>

        {/* Footer component */}
        <Footer />
      </body>
    </html>
  );
}
