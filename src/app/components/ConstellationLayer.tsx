"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
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
  isLaptop: boolean;
  isDesktop: boolean;
}

interface CosmicParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  type: "dust" | "sparkle" | "nebula";
  color: string;
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
      { x: 27.6, y: 11.5 }, // 0 - Epsilon (22 * 1.3, 9.24 * 1.3)
      { x: 26, y: 10.375 }, // 1 - Mu (20 * 1.3, 8.75 * 1.3)
      { x: 22.1, y: 11.376 }, // 2 - Zeta (17 * 1.3, 9.52 * 1.3)
      { x: 21.4, y: 13.377 }, // 3 - Gamma (18 * 1.3, 10.29 * 1.3)
      { x: 25.9, y: 15.014 }, // 4 - Alpha (23 * 1.3, 10.78 * 1.3)
      { x: 25.5, y: 17 }, // 5 - Zosma (24 * 1.3, 11.83 * 1.3)
      { x: 11.6, y: 16 }, // 6 - Chertan (12 * 1.3, 11.83 * 1.3)
      { x: 6.1, y: 16.834 }, // 7 - Chertan (7 * 1.3, 12.18 * 1.3)
      { x: 10.5, y: 13.377 }, // 8 - Theta (12 * 1.3, 10.85 * 1.3)
    ],
    connections: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
      { from: 3, to: 8 },
      { from: 8, to: 7 },
    ],
    special: true,
  },
  {
    id: "code-structure",
    name: "The Code Tree",
    description:
      "A developer's constellation representing the structure of clean, organized code - from root to branches",
    stars: [
      { x: 85, y: 18.2435 },
      { x: 83, y: 16.08325 },
      { x: 87, y: 16.08325 },
      { x: 81, y: 13.923 },
      { x: 85, y: 13.923 },
      { x: 89, y: 13.923 },
      { x: 79, y: 11.76275 },
      { x: 83, y: 11.76275 },
      { x: 87, y: 11.76275 },
      { x: 91, y: 11.76275 },
      { x: 85, y: 9.6025 },
    ],
    connections: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 3, to: 7 },
      { from: 4, to: 7 },
      { from: 4, to: 8 },
      { from: 4, to: 10 },
      { from: 5, to: 8 },
      { from: 5, to: 9 },
    ],
    special: true,
  },
] as const;

// ============================================================================
// COSMIC PARTICLE GENERATION
// ============================================================================

const generateCosmicParticles = (viewport: ViewportSize): CosmicParticle[] => {
  const particles: CosmicParticle[] = [];
  const particleCount = viewport.isLaptop ? 50 : 80; // Adjust count based on screen size

  const colors = [
    "rgba(255, 50, 50, 0.9)", 
    "rgba(50, 255, 50, 0.8)", 
    "rgba(255, 255, 50, 0.8)", 
    "rgba(255, 100, 255, 0.7)", 
    "rgba(50, 255, 255, 0.7)", 
    "rgba(255, 150, 50, 0.6)", 
  ];

  for (let i = 0; i < particleCount; i++) {
    const type: CosmicParticle["type"] =
      Math.random() < 0.6 ? "dust" : Math.random() < 0.8 ? "sparkle" : "nebula";

    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size:
        type === "dust"
          ? Math.random() * 2 + 1
          : type === "sparkle"
          ? Math.random() * 3 + 2
          : Math.random() * 8 + 4,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 20 + 10, // 10-30 seconds
      delay: Math.random() * 5,
      type,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  return particles;
};

// ============================================================================
// RESPONSIVE SCALING UTILITIES (LAPTOP+ ONLY)
// ============================================================================

const getViewportInfo = (width: number, height: number): ViewportSize => ({
  width,
  height,
  isLaptop: width >= 1024 && width < 1440,
  isDesktop: width >= 1440,
});

const getResponsiveScale = (viewport: ViewportSize) => {
  const baseWidth = 1920;
  const baseHeight = 1080;

  const widthScale = viewport.width / baseWidth;
  const heightScale = viewport.height / baseHeight;
  const scale = Math.min(widthScale, heightScale);

  if (viewport.isLaptop) return Math.max(0.9, Math.min(scale, 1.1));
  if (viewport.isDesktop) return Math.max(1.0, Math.min(scale, 1.3));

  return Math.max(1.2, Math.min(scale, 1.5));
};

const getStarSize = (viewport: ViewportSize, isSpecial: boolean) => {
  const scale = getResponsiveScale(viewport);
  let baseSize = isSpecial ? 16 : 12;

  if (viewport.isLaptop) {
    baseSize = isSpecial ? 16 : 12;
    return Math.max(12, baseSize * scale);
  }

  if (viewport.isDesktop) {
    baseSize = isSpecial ? 18 : 14;
    return Math.max(14, baseSize * scale);
  }

  // Ultra-wide displays
  baseSize = isSpecial ? 20 : 16;
  return Math.max(16, baseSize * scale);
};

const getStrokeWidth = (viewport: ViewportSize) => {
  const scale = getResponsiveScale(viewport);
  let baseStrokeWidth = 2;

  if (viewport.isLaptop) {
    baseStrokeWidth = 2.0;
    return Math.max(1.8, baseStrokeWidth * scale);
  }

  if (viewport.isDesktop) {
    baseStrokeWidth = 2.2;
    return Math.max(2.0, baseStrokeWidth * scale);
  }

  // Ultra-wide displays
  baseStrokeWidth = 2.5;
  return Math.max(2.2, baseStrokeWidth * scale);
};

const getHoverScale = (viewport: ViewportSize) => {
  if (viewport.isLaptop) return 1.8;
  if (viewport.isDesktop) return 2.2;
  return 2.5; // Ultra-wide
};

const getTooltipSize = (viewport: ViewportSize) => {
  if (viewport.isLaptop)
    return { width: 280, padding: "p-2.5", textSize: "text-sm" };
  if (viewport.isDesktop)
    return { width: 320, padding: "p-3", textSize: "text-sm" };
  return { width: 360, padding: "p-4", textSize: "text-base" }; // Ultra-wide
};

// ============================================================================
// CONSTELLATION LAYER WITH COSMIC PARTICLES
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
    isLaptop: false,
    isDesktop: false,
  });

  // Generate cosmic particles based on viewport
  const cosmicParticles = useMemo(() => {
    if (viewport.width < 1024) return [];
    return generateCosmicParticles(viewport);
  }, [viewport.width, viewport.height]);

  // ========================================================================
  // VIEWPORT TRACKING
  // ========================================================================

  useEffect(() => {
    const updateViewport = () => {
      const newViewport = getViewportInfo(
        window.innerWidth,
        window.innerHeight
      );
      setViewport(newViewport);
    };

    updateViewport();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewport, 150);
    };

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("orientationchange", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("orientationchange", debouncedResize);
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

      const tooltipConfig = getTooltipSize(viewport);
      const tooltipHeight = 120;

      let x = event.clientX + 15;
      let y = event.clientY - 10;

      if (x + tooltipConfig.width > viewport.width) {
        x = event.clientX - tooltipConfig.width - 15;
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
  // RENDER - LAPTOP+ ONLY WITH COSMIC PARTICLES
  // ========================================================================

  // Hide component on screens smaller than laptop (< 1024px)
  if (viewport.width < 1024) {
    return null;
  }

  const strokeWidth = getStrokeWidth(viewport);
  const hoverScale = getHoverScale(viewport);
  const tooltipConfig = getTooltipSize(viewport);

  return (
    <>
      {/* Cosmic Particle Background */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {cosmicParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              filter:
                particle.type === "sparkle"
                  ? "blur(0.5px)"
                  : particle.type === "nebula"
                  ? "blur(2px)"
                  : "none",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, particle.type === "dust" ? 5 : 0, 0],
              opacity: [
                particle.opacity,
                particle.opacity * 0.3,
                particle.opacity,
              ],
              scale: particle.type === "sparkle" ? [1, 1.5, 1] : [1, 1.1, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

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

      {/* Enhanced Responsive Tooltip */}
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
            className={`bg-galaxy-cosmic/95 backdrop-blur-sm border border-galaxy-border rounded-lg shadow-lg ${tooltipConfig.padding}`}
            style={{ maxWidth: `${tooltipConfig.width}px` }}
          >
            <h3
              className={`text-galaxy-text-accent font-semibold mb-1 ${tooltipConfig.textSize}`}
            >
              {tooltip.constellation.name}
            </h3>
            <p
              className={`text-galaxy-text-secondary leading-relaxed mb-2 ${tooltipConfig.textSize}`}
            >
              {tooltip.constellation.description}
            </p>
            <div className="text-galaxy-text-muted mt-2 italic text-sm">
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
