"use client";

import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/page-transition";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const pathname = usePathname();

  // Reset any animation state when route changes
  useEffect(() => {
    // Force a layout recalculation
    document.body.style.opacity = "0.99";
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 10);
  }, [pathname]);

  return (
    <>
      {!isLoading && <Navbar />}

      <AnimatePresence mode="wait" initial={true}>
        <PageTransition key={pathname}>{children}</PageTransition>
      </AnimatePresence>

      <Footer />
    </>
  );
}
