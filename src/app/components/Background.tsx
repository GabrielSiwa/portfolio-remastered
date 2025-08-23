"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Background() {
  // render the same visual layers used in Footer: starfield + animated gradient + floating particles
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base color to match Footer */}
      <div className="absolute inset-0 bg-galaxy-void" />

      {/* Starfield layer (subtle) */}
      <div className="absolute inset-0 starfield opacity-20" />

      {/* Floating particles like in Footer */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-galaxy-stardust rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay similar to Footer */}
      <div className="absolute inset-0 bg-gradient-to-t from-galaxy-cosmic/30 to-transparent" />
    </div>
  );
}
