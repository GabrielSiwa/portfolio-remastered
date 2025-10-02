"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  constellation: {
    name: string;
    description: string;
  } | null;
}

// ============================================================================
// CONSTELLATION CONFIGURATION
// ============================================================================

const CONSTELLATIONS = [
  {
    id: "leo",
    name: "Leo ♌",
    description:
      "The Lion - Gabriel's zodiac constellation, representing courage, leadership, and creativity",
    stars: [
      // The Sickle (backwards question mark) - Lion's head and mane
      { x: 29, y: 16 }, // 0 - Epsilon (Ras Elased) - top of sickle
      { x: 25, y: 15 }, // 1 - Mu (Rasalas)
      { x: 20, y: 18 }, // 2 - Zeta (Adhafera)
      { x: 21, y: 21 }, // 3 - Gamma (Algieba)
      { x: 26, y: 22 }, // 4 - Alpha (Regulus) - heart/bottom of sickle
      { x: 27, y: 27 }, // 5 - Zosma

      // Body
      { x: 30, y: 30 }, // 6 - Chertan
      { x: 32, y: 32 }, // 7 - Chertan
      { x: 34, y: 35 }, // 8 - Theta
    ],
    connections: [
      // The Sickle pattern (exactly like your reference image)
      { from: 0, to: 1 }, // Epsilon to Mu
      { from: 1, to: 2 }, // Mu to Zeta (Adhafera)
      { from: 2, to: 3 }, // Zeta to Gamma (Algieba)
      { from: 3, to: 4 }, // Gamma to Alpha (Regulus)
      { from: 4, to: 5 }, // Alpha to Zosma
      { from: 5, to: 6 }, // Zosma to Chertan
    ],
    special: true,
  },
  {
    id: "code-structure",
    name: "The Code Tree",
    description:
      "A developer's constellation representing the structure of clean, organized code - from root to branches",
    stars: [
      { x: 85, y: 30 }, // Root
      { x: 83, y: 25 }, // Left main branch
      { x: 87, y: 25 }, // Right main branch
      { x: 81, y: 20 }, // Left sub branch
      { x: 85, y: 20 }, // Center sub branch
      { x: 89, y: 20 }, // Right sub branch
      { x: 79, y: 15 }, // Far left leaf
      { x: 83, y: 15 }, // Left leaf
      { x: 87, y: 15 }, // Right leaf
      { x: 91, y: 15 }, // Far right leaf
      { x: 85, y: 10 }, // Top
    ],
    connections: [
      { from: 0, to: 1 }, // Root to left main branch
      { from: 0, to: 2 }, // Root to right main branch
      { from: 1, to: 3 }, // Left main to left sub
      { from: 1, to: 4 }, // Left main to center sub
      { from: 2, to: 4 }, // Right main to center sub
      { from: 2, to: 5 }, // Right main to right sub
      { from: 3, to: 6 }, // Left sub to far left leaf
      { from: 3, to: 7 }, // Left sub to left leaf
      { from: 4, to: 7 }, // Center sub to left leaf
      { from: 4, to: 8 }, // Center sub to right leaf
      { from: 4, to: 10 }, // Center sub to top
      { from: 5, to: 8 }, // Right sub to right leaf
      { from: 5, to: 9 }, // Right sub to far right leaf
    ],
    special: true,
  },
] as const;

// ============================================================================
// CONSTELLATION LAYER COMPONENT
// ============================================================================

const ConstellationLayer: React.FC = () => {
  const [activeConstellation, setActiveConstellation] = useState<string | null>(
    null
  );
  const [hoveredConstellation, setHoveredConstellation] = useState<
    string | null
  >(null);
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    constellation: null,
  });

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleConstellationClick = useCallback((constellationId: string) => {
    console.log(`🌟 Clicked constellation: ${constellationId}`);
    setActiveConstellation((prev) =>
      prev === constellationId ? null : constellationId
    );
  }, []);

  const handleConstellationHover = useCallback(
    (constellationId: string, event: React.MouseEvent) => {
      console.log(`🌟 Hovering constellation: ${constellationId}`);
      const constellation = CONSTELLATIONS.find(
        (c) => c.id === constellationId
      );
      if (!constellation) return;

      setHoveredConstellation(constellationId);
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        constellation: {
          name: constellation.name,
          description: constellation.description,
        },
      });
    },
    []
  );

  const handleConstellationLeave = useCallback(() => {
    setHoveredConstellation(null);
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      constellation: null,
    });
  }, []);

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <>
      {/* Constellation stars - positioned as part of the background */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="relative w-full h-full">
          {CONSTELLATIONS.map((constellation) => (
            <div key={constellation.id} className="absolute inset-0">
              {/* Constellation stars */}
              {constellation.stars.map((star, index) => (
                <div
                  key={`${constellation.id}-star-${index}`}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 25, // Higher than Hero content but lower than navigation
                  }}
                >
                  <motion.div
                    className={`rounded-full cursor-pointer transition-all duration-300 ${
                      constellation.special ? "w-4 h-4" : "w-3 h-3"
                    } ${
                      activeConstellation === constellation.id
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-400/50"
                        : hoveredConstellation === constellation.id
                        ? "bg-gradient-to-r from-yellow-300 to-orange-400 shadow-md shadow-yellow-300/40"
                        : "bg-gradient-to-r from-yellow-500 to-orange-600"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        `🌟 Star clicked: ${constellation.id}-${index}`
                      );
                      handleConstellationClick(constellation.id);
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      console.log(
                        `🌟 Star hovered: ${constellation.id}-${index}`
                      );
                      handleConstellationHover(constellation.id, e);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      handleConstellationLeave();
                    }}
                    whileHover={{
                      scale: 2.5,
                      rotate: [0, 15, -15, 0],
                    }}
                    animate={{
                      opacity:
                        activeConstellation === constellation.id
                          ? 1
                          : hoveredConstellation === constellation.id
                          ? 1
                          : 0.9,
                      boxShadow:
                        hoveredConstellation === constellation.id
                          ? "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)"
                          : undefined,
                    }}
                    transition={{
                      rotate: { duration: 0.6, ease: "easeInOut" },
                      scale: { duration: 0.2, ease: "easeOut" },
                    }}
                  />
                </div>
              ))}

              {/* Constellation lines */}
              {(activeConstellation === constellation.id ||
                hoveredConstellation === constellation.id) && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {constellation.connections.map((connection, index) => {
                    const fromStar = constellation.stars[connection.from];
                    const toStar = constellation.stars[connection.to];

                    if (!fromStar || !toStar) return null;

                    return (
                      <motion.line
                        key={`${constellation.id}-line-${index}`}
                        x1={`${fromStar.x}%`}
                        y1={`${fromStar.y}%`}
                        x2={`${toStar.x}%`}
                        y2={`${toStar.y}%`}
                        stroke="rgba(255, 215, 0, 0.8)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        filter="drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))"
                      />
                    );
                  })}
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip - positioned with higher z-index */}
      {tooltip.visible && tooltip.constellation && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltip.x + 15}px`,
            top: `${tooltip.y - 10}px`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-galaxy-cosmic/95 backdrop-blur-sm border border-galaxy-border rounded-lg p-3 max-w-xs shadow-lg"
          >
            <h3 className="text-galaxy-text-accent font-semibold text-sm mb-1">
              {tooltip.constellation.name}
            </h3>
            <p className="text-galaxy-text-secondary text-xs leading-relaxed">
              {tooltip.constellation.description}
            </p>
            <div className="text-galaxy-text-muted text-xs mt-2 italic">
              Click to{" "}
              {activeConstellation === hoveredConstellation ? "hide" : "reveal"}{" "}
              constellation lines
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ConstellationLayer;
