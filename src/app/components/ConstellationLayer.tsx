"use client";

import React, { useState, useCallback, useEffect } from "react";
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

interface ViewportSize {
  width: number;
  height: number;
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
      { x: 22, y: 13.2 }, // 0 - Epsilon (Ras Elased) - top of sickle
      { x: 20, y: 12.5 }, // 1 - Mu (Rasalas)
      { x: 17, y: 13.6 }, // 2 - Zeta (Adhafera)
      { x: 18, y: 14.7 }, // 3 - Gamma (Algieba)
      { x: 23, y: 15.4 }, // 4 - Alpha (Regulus) - heart/bottom of sickle
      { x: 24, y: 16.9 }, // 5 - Zosma

      // Body
      { x: 12, y: 16.9 }, // 6 - Chertan
      { x: 7, y: 17.4 }, // 7 - Chertan
      { x: 12, y: 15.5 }, // 8 - Theta
    ],
    connections: [
      // The Sickle pattern (exactly like your reference image)
      { from: 0, to: 1 }, // Epsilon to Mu
      { from: 1, to: 2 }, // Mu to Zeta (Adhafera)
      { from: 2, to: 3 }, // Zeta to Gamma (Algieba)
      { from: 3, to: 4 }, // Gamma to Alpha (Regulus)
      { from: 4, to: 5 }, // Alpha to Zosma
      { from: 5, to: 6 }, // Zosma to Chertan
      { from: 6, to: 7 }, // Chertan to Chertan
      { from: 3, to: 8 }, // Gamma to Theta
      { from: 8, to: 7 }, // Theta to Chertan
    ],
    special: true,
  },
  {
    id: "code-structure",
    name: "The Code Tree",
    description:
      "A developer's constellation representing the structure of clean, organized code - from root to branches",
    stars: [
      { x: 85, y: 17.85 }, // Root
      { x: 83, y: 16.575 }, // Left main branch
      { x: 87, y: 16.575 }, // Right main branch
      { x: 81, y: 15.3 }, // Left sub branch
      { x: 85, y: 15.3 }, // Center sub branch
      { x: 89, y: 15.3 }, // Right sub branch
      { x: 79, y: 14.025 }, // Far left leaf
      { x: 83, y: 14.025 }, // Left leaf
      { x: 87, y: 14.025 }, // Right leaf
      { x: 91, y: 14.025 }, // Far right leaf
      { x: 85, y: 12.75 }, // Top
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
// SCALING UTILITIES
// ============================================================================

const getResponsiveScale = (viewport: ViewportSize) => {
  const baseWidth = 1920; // Desktop reference
  const baseHeight = 1080;

  // Calculate scale based on viewport size
  const widthScale = viewport.width / baseWidth;
  const heightScale = viewport.height / baseHeight;
  const scale = Math.min(widthScale, heightScale);

  // Clamp scale between reasonable bounds
  return Math.max(0.5, Math.min(scale, 1.5));
};

const getStarSize = (viewport: ViewportSize, isSpecial: boolean) => {
  const scale = getResponsiveScale(viewport);
  const baseSize = isSpecial ? 16 : 12; // Base size in pixels
  const scaledSize = Math.max(8, baseSize * scale); // Minimum 8px

  // Responsive breakpoints
  if (viewport.width < 640) return Math.max(6, scaledSize * 0.7); // Mobile
  if (viewport.width < 768) return Math.max(8, scaledSize * 0.8); // Tablet
  if (viewport.width < 1024) return Math.max(10, scaledSize * 0.9); // Small desktop

  return scaledSize;
};

const getStrokeWidth = (viewport: ViewportSize) => {
  const scale = getResponsiveScale(viewport);
  const baseStrokeWidth = 2;
  const scaledStrokeWidth = Math.max(1, baseStrokeWidth * scale);

  // Responsive breakpoints
  if (viewport.width < 640) return Math.max(1, scaledStrokeWidth * 0.7);
  if (viewport.width < 768) return Math.max(1.5, scaledStrokeWidth * 0.8);

  return scaledStrokeWidth;
};

const getHoverScale = (viewport: ViewportSize) => {
  // Reduce hover scale on smaller screens to prevent overlap
  if (viewport.width < 640) return 1.8; // Mobile
  if (viewport.width < 768) return 2.0; // Tablet
  if (viewport.width < 1024) return 2.2; // Small desktop
  return 2.5; // Large desktop
};

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
  const [viewport, setViewport] = useState<ViewportSize>({
    width: 1920,
    height: 1080,
  });

  // ========================================================================
  // VIEWPORT TRACKING
  // ========================================================================

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial viewport
    updateViewport();

    // Add resize listener with debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewport, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleConstellationClick = useCallback((constellationId: string) => {
    setActiveConstellation((prev) =>
      prev === constellationId ? null : constellationId
    );
  }, []);

  const handleConstellationHover = useCallback(
    (constellationId: string, event: React.MouseEvent) => {
      const constellation = CONSTELLATIONS.find(
        (c) => c.id === constellationId
      );
      if (!constellation) return;

      setHoveredConstellation(constellationId);

      // Calculate tooltip position with viewport bounds checking
      const tooltipWidth = 300; // Approximate tooltip width
      const tooltipHeight = 120; // Approximate tooltip height

      let x = event.clientX + 15;
      let y = event.clientY - 10;

      // Keep tooltip within viewport bounds
      if (x + tooltipWidth > viewport.width) {
        x = event.clientX - tooltipWidth - 15;
      }
      if (y + tooltipHeight > viewport.height) {
        y = event.clientY - tooltipHeight - 15;
      }

      setTooltip({
        visible: true,
        x: Math.max(10, x),
        y: Math.max(10, y),
        constellation: {
          name: constellation.name,
          description: constellation.description,
        },
      });
    },
    [viewport]
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

  const starSize = getStarSize(viewport, true);
  const strokeWidth = getStrokeWidth(viewport);
  const hoverScale = getHoverScale(viewport);

  return (
    <>
      {/* Constellation stars - positioned as part of the background */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="relative w-full h-full">
          {CONSTELLATIONS.map((constellation) => (
            <div key={constellation.id} className="absolute inset-0">
              {/* Constellation stars */}
              {constellation.stars.map((star, index) => {
                const currentStarSize = getStarSize(
                  viewport,
                  constellation.special
                );

                return (
                  <div
                    key={`${constellation.id}-star-${index}`}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 25,
                    }}
                  >
                    <motion.div
                      className={`rounded-full cursor-pointer transition-all duration-300 ${
                        activeConstellation === constellation.id
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-400/50"
                          : hoveredConstellation === constellation.id
                          ? "bg-gradient-to-r from-yellow-300 to-orange-400 shadow-md shadow-yellow-300/40"
                          : "bg-gradient-to-r from-yellow-500 to-orange-600"
                      }`}
                      style={{
                        width: `${currentStarSize}px`,
                        height: `${currentStarSize}px`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConstellationClick(constellation.id);
                      }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        handleConstellationHover(constellation.id, e);
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        handleConstellationLeave();
                      }}
                      whileHover={{
                        scale: hoverScale,
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
                            ? `0 0 ${
                                30 * getResponsiveScale(viewport)
                              }px rgba(255, 215, 0, 0.8), 0 0 ${
                                60 * getResponsiveScale(viewport)
                              }px rgba(255, 215, 0, 0.4)`
                            : undefined,
                      }}
                      transition={{
                        rotate: { duration: 0.6, ease: "easeInOut" },
                        scale: { duration: 0.2, ease: "easeOut" },
                      }}
                    />
                  </div>
                );
              })}

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
                        strokeWidth={strokeWidth}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        filter={`drop-shadow(0 0 ${
                          3 * getResponsiveScale(viewport)
                        }px rgba(255, 215, 0, 0.5))`}
                      />
                    );
                  })}
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Tooltip */}
      {tooltip.visible && tooltip.constellation && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`bg-galaxy-cosmic/95 backdrop-blur-sm border border-galaxy-border rounded-lg shadow-lg ${
              viewport.width < 640
                ? "p-2 max-w-[250px]" // Mobile
                : viewport.width < 768
                ? "p-2.5 max-w-[280px]" // Tablet
                : "p-3 max-w-xs" // Desktop
            }`}
          >
            <h3
              className={`text-galaxy-text-accent font-semibold mb-1 ${
                viewport.width < 640 ? "text-xs" : "text-sm"
              }`}
            >
              {tooltip.constellation.name}
            </h3>
            <p
              className={`text-galaxy-text-secondary leading-relaxed ${
                viewport.width < 640 ? "text-xs" : "text-xs"
              }`}
            >
              {tooltip.constellation.description}
            </p>
            <div
              className={`text-galaxy-text-muted mt-2 italic ${
                viewport.width < 640 ? "text-xs" : "text-xs"
              }`}
            >
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
