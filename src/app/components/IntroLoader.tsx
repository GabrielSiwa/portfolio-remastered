"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onComplete?: () => void;
}

/**
 * IntroLoader Component
 *
 * Elegant fade-in/fade-out intro screen that shows on every page visit.
 * Shows "GABRIEL SIWA" with gradient text and subtle motion.
 *
 * Timeline:
 * - 0.0s - 0.6s: Fade in + slight upward motion
 * - 0.6s - 0.9s: Hold at full opacity
 * - 0.9s - 1.5s: Fade out
 * - 1.5s: Component unmounts
 *
 * Features:
 * - Respects prefers-reduced-motion
 * - Shows on every page load
 * - Zero dependencies (uses Framer Motion already in project)
 * - Smooth 60fps animations via GPU acceleration
 */
const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip intro - user prefers reduced motion
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Show the intro on every visit
    setShouldRender(true);

    // Timeline: fade in (600ms) + hold (300ms) + fade out (600ms)
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 900); // Start fade out at 900ms

    // Unmount after fade out completes
    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, 1500); // Total duration

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  // Don't render if intro should be skipped
  if (!shouldRender) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          style={{
            pointerEvents: "none",
          }}
        >
          {/* Animated Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 1,
              ease: [0, 1, 0.36, 1], // Custom easing for smooth motion
            }}
            className="text-center"
          >
            {/* Main Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-galaxy-text-accent via-galaxy-text-secondary to-galaxy-plasma bg-clip-text text-transparent">
                GABRIEL SIWA
              </span>
            </h1>

            {/* Subtle subtitle - optional */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 text-galaxy-text-secondary text-sm sm:text-base tracking-widest uppercase"
            >
              Full-Stack Developer
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
