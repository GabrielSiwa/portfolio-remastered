"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalytics } from "@/app/hooks/useAnalytics";
import { HiOutlineUserGroup } from "react-icons/hi";

const VisitCounter = () => {
  const { visitorCount } = useAnalytics();
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Easter Egg Check
  useEffect(() => {
    if (visitorCount > 0 && visitorCount.toString().includes("67")) {
      setShowEasterEgg(true);
      const timer = setTimeout(() => setShowEasterEgg(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [visitorCount]);

  if (visitorCount === 0) return null; // Don't show if loading/error

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-galaxy-cosmic/50 border border-galaxy-border/30 backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-galaxy-cosmic hover:shadow-galaxy-glow/20">
        <HiOutlineUserGroup className="w-4 h-4 text-galaxy-accent animate-pulse" />
        <span className="text-xs font-mono font-medium text-galaxy-text-secondary">
          Visitor #{visitorCount.toLocaleString()}
        </span>
      </div>

      {/* Easter Egg Animation */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="flex gap-1 text-2xl font-bold">
              <motion.span
                animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-galaxy-plasma drop-shadow-glow"
              >
                6
              </motion.span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                className="text-galaxy-aurora drop-shadow-glow"
              >
                7
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitCounter;
