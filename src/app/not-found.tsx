"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
const CONSTELLATION_404 = {
  id: "error-404",
  name: "Error 404",
  stars: [
    // First "4"
    { x: 15, y: 25 }, // 0
    { x: 15, y: 32 }, // 1
    { x: 15, y: 39 }, // 2
    { x: 15, y: 46 }, // 3
    { x: 20, y: 46 }, // 4
    { x: 25, y: 46 }, // 5
    { x: 30, y: 46 }, // 6
    { x: 30, y: 39 }, // 7
    { x: 30, y: 32 }, // 8
    { x: 30, y: 25 }, // 9
    { x: 30, y: 53 }, // 10
    { x: 30, y: 60 }, // 11
    { x: 30, y: 67 }, // 12

    // "0"
    { x: 45, y: 25 }, // 13
    { x: 50, y: 25 }, // 14
    { x: 55, y: 25 }, // 15
    { x: 60, y: 25 }, // 16
    { x: 42, y: 30 }, // 17
    { x: 63, y: 30 }, // 18
    { x: 40, y: 35 }, // 19
    { x: 65, y: 35 }, // 20
    { x: 40, y: 42 }, // 21
    { x: 65, y: 42 }, // 22
    { x: 40, y: 49 }, // 23
    { x: 65, y: 49 }, // 24
    { x: 40, y: 56 }, // 25
    { x: 65, y: 56 }, // 26
    { x: 40, y: 63 }, // 27
    { x: 65, y: 63 }, // 28
    { x: 42, y: 68 }, // 29
    { x: 63, y: 68 }, // 30
    { x: 45, y: 73 }, // 31
    { x: 50, y: 73 }, // 32
    { x: 55, y: 73 }, // 33
    { x: 60, y: 73 }, // 34

    // Second "4"
    { x: 75, y: 25 }, // 35
    { x: 75, y: 32 }, // 36
    { x: 75, y: 39 }, // 37
    { x: 75, y: 46 }, // 38
    { x: 80, y: 46 }, // 39
    { x: 85, y: 46 }, // 40
    { x: 90, y: 46 }, // 41
    { x: 90, y: 39 }, // 42
    { x: 90, y: 32 }, // 43
    { x: 90, y: 25 }, // 44
    { x: 90, y: 53 }, // 45
    { x: 90, y: 60 }, // 46
    { x: 90, y: 67 }, // 47
  ],
  connections: [
    // First "4" vertical left
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    // First "4" horizontal
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    // First "4" vertical right top
    { from: 6, to: 7 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    // First "4" vertical right bottom
    { from: 6, to: 10 },
    { from: 10, to: 11 },
    { from: 11, to: 12 },

    // "0" top
    { from: 13, to: 14 },
    { from: 14, to: 15 },
    { from: 15, to: 16 },
    // "0" sides top
    { from: 13, to: 17 },
    { from: 16, to: 18 },
    // "0" left side
    { from: 17, to: 19 },
    { from: 19, to: 21 },
    { from: 21, to: 23 },
    { from: 23, to: 25 },
    { from: 25, to: 27 },
    { from: 27, to: 29 },
    // "0" right side
    { from: 18, to: 20 },
    { from: 20, to: 22 },
    { from: 22, to: 24 },
    { from: 24, to: 26 },
    { from: 26, to: 28 },
    { from: 28, to: 30 },
    // "0" bottom
    { from: 29, to: 31 },
    { from: 31, to: 32 },
    { from: 32, to: 33 },
    { from: 33, to: 34 },
    { from: 34, to: 30 },

    // Second "4" vertical left
    { from: 35, to: 36 },
    { from: 36, to: 37 },
    { from: 37, to: 38 },
    // Second "4" horizontal
    { from: 38, to: 39 },
    { from: 39, to: 40 },
    { from: 40, to: 41 },
    // Second "4" vertical right top
    { from: 41, to: 42 },
    { from: 42, to: 43 },
    { from: 43, to: 44 },
    // Second "4" vertical right bottom
    { from: 41, to: 45 },
    { from: 45, to: 46 },
    { from: 46, to: 47 },
  ],
};

export default function NotFound() {
  const [showConstellation, setShowConstellation] = useState(false);

  useEffect(() => {
    // Show constellation after a brief delay
    const timer = setTimeout(() => setShowConstellation(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const starSize = 12; // Match ConstellationLayer default size
  const strokeWidth = 4; // Match ConstellationLayer stroke width

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2 pt-24">
        <div className="w-full max-w-6xl px-2">
          {/* Constellation "404" - matching ConstellationLayer style */}
          <motion.div className="relative w-full aspect-[2/1] mx-auto">
            {/* Constellation Stars - styled exactly like ConstellationLayer */}
            {CONSTELLATION_404.stars.map((star, index) => (
              <div
                key={`star-${index}`}
                className="absolute pointer-events-auto"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 25,
                }}
              >
                <motion.div
                  className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                  style={{
                    width: `${starSize}px`,
                    height: `${starSize}px`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={showConstellation ? { scale: 1, opacity: 0.9 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.015,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.5,
                    rotate: [0, 15, -15, 0],
                    boxShadow:
                      "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)",
                  }}
                />
              </div>
            ))}

            {/* Constellation Lines - styled exactly like ConstellationLayer */}
            {showConstellation && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {CONSTELLATION_404.connections.map((connection, index) => {
                  const fromStar = CONSTELLATION_404.stars[connection.from];
                  const toStar = CONSTELLATION_404.stars[connection.to];

                  if (!fromStar || !toStar) return null;

                  return (
                    <motion.line
                      key={`line-${index}`}
                      x1={`${fromStar.x}%`}
                      y1={`${fromStar.y}%`}
                      x2={`${toStar.x}%`}
                      y2={`${toStar.y}%`}
                      stroke="rgba(255, 215, 0, 0.8)"
                      strokeWidth={strokeWidth}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.05,
                        ease: "easeInOut",
                      }}
                      filter="drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))"
                    />
                  );
                })}
              </svg>
            )}
          </motion.div>

          {/* Text content */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white ">
              Lost in Space
            </h1>
            <p className="text-lg md:text-xl text-galaxy-text-accent/80 max-w-2xl mx-auto">
              The page you&apos;re looking for has drifted into the cosmic void.
              <br />
              <span className="text-sm text-galaxy-text-accent/60">
                &quot;In space, no one can hear you 404.&quot;
              </span>
            </p>

            {/* CTA Button */}
            <motion.div
              className="pt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-8 py-4 mb-8 rounded-xl font-bold text-white text-lg"
                style={{
                  background: "linear-gradient(135deg, #1a234a, #2a3a6c)",
                  border: "1px solid #3b4b8c",
                  boxShadow:
                    "0 10px 30px rgba(10,20,50,0.4), inset 0 0 0 1px #ffffff0d, 0 0 30px rgba(142,197,255,0.3)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="m12 3 9 8h-3v8h-5v-5H11v5H6v-8H3z" />
                </svg>
                Return to Earth
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: "0 0 4px #fff, 0 0 8px #8ec5ff",
          }}
          animate={{
            x: [0, -300],
            y: [0, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 4 + 2,
            repeat: Infinity,
            repeatDelay: 8,
          }}
        />
      ))}
    </div>
  );
}
