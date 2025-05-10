"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/page-transition";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we've shown the loader before
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedSite");
    if (hasLoadedBefore) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

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
