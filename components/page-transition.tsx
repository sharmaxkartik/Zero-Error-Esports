"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Force animation reset on route change
  useEffect(() => {
    // Scroll to top on page changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      key={pathname} // This key is critical for forcing remount
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
