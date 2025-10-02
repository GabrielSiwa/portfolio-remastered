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
  isMobile: boolean;
  isTablet: boolean;
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
      { x: 22, y: 9.24 }, // 0 - Epsilon (30% up from 13.2)
      { x: 20, y: 8.75 }, // 1 - Mu (30% up from 12.5)
      { x: 17, y: 9.52 }, // 2 - Zeta (30% up from 13.6)
      { x: 18, y: 10.29 }, // 3 - Gamma (30% up from 14.7)
      { x: 23, y: 10.78 }, // 4 - Alpha (30% up from 15.4)
      { x: 24, y: 11.83 }, // 5 - Zosma (30% up from 16.9)
      { x: 12, y: 11.83 }, // 6 - Chertan (30% up from 16.9)
      { x: 7, y: 12.18 }, // 7 - Chertan (30% up from 17.4)
      { x: 12, y: 10.85 }, // 8 - Theta (30% up from 15.5)
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
      { x: 85, y: 12.495 }, // Root (30% up from 17.85)
      { x: 83, y: 11.6025 }, // Left main branch (30% up from 16.575)
      { x: 87, y: 11.6025 }, // Right main branch (30% up from 16.575)
      { x: 81, y: 10.71 }, // Left sub branch (30% up from 15.3)
      { x: 85, y: 10.71 }, // Center sub branch (30% up from 15.3)
      { x: 89, y: 10.71 }, // Right sub branch (30% up from 15.3)
      { x: 79, y: 9.8175 }, // Far left leaf (30% up from 14.025)
      { x: 83, y: 9.8175 }, // Left leaf (30% up from 14.025)
      { x: 87, y: 9.8175 }, // Right leaf (30% up from 14.025)
      { x: 91, y: 9.8175 }, // Far right leaf (30% up from 14.025)
      { x: 85, y: 8.925 }, // Top (30% up from 12.75)
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
// MOBILE-FRIENDLY SCALING UTILITIES
// ============================================================================

const getViewportInfo = (width: number, height: number): ViewportSize => ({
  width,
  height,
  isMobile: width < 768,
  isTablet: width >= 768 && width < 1024,
});

const getResponsiveScale = (viewport: ViewportSize) => {
  const baseWidth = 1920;
  const baseHeight = 1080;

  const widthScale = viewport.width / baseWidth;
  const heightScale = viewport.height / baseHeight;
  const scale = Math.min(widthScale, heightScale);

  // More aggressive scaling for mobile
  if (viewport.isMobile) return Math.max(0.4, Math.min(scale, 1.0));
  if (viewport.isTablet) return Math.max(0.6, Math.min(scale, 1.2));

  return Math.max(0.8, Math.min(scale, 1.5));
};

const getStarSize = (viewport: ViewportSize, isSpecial: boolean) => {
  const scale = getResponsiveScale(viewport);
  let baseSize = isSpecial ? 16 : 12;

  // Mobile-first sizing
  if (viewport.isMobile) {
    baseSize = isSpecial ? 20 : 16; // Larger touch targets for mobile
    return Math.max(16, baseSize * scale); // Minimum 16px for accessibility
  }

  if (viewport.isTablet) {
    baseSize = isSpecial ? 18 : 14;
    return Math.max(12, baseSize * scale);
  }

  return Math.max(10, baseSize * scale);
};

const getStrokeWidth = (viewport: ViewportSize) => {
  const scale = getResponsiveScale(viewport);
  let baseStrokeWidth = 2;

  if (viewport.isMobile) {
    baseStrokeWidth = 2.5; // Thicker lines for mobile visibility
    return Math.max(2, baseStrokeWidth * scale);
  }

  if (viewport.isTablet) {
    baseStrokeWidth = 2.2;
    return Math.max(1.8, baseStrokeWidth * scale);
  }

  return Math.max(1.5, baseStrokeWidth * scale);
};

const getHoverScale = (viewport: ViewportSize) => {
  // Reduced hover effects for mobile (touch doesn't really have hover)
  if (viewport.isMobile) return 1.3;
  if (viewport.isTablet) return 1.6;
  return 2.2;
};

const getTouchAreaSize = (viewport: ViewportSize) => {
  // Minimum touch target size (44px recommended by Apple, 48px by Google)
  if (viewport.isMobile) return 48;
  if (viewport.isTablet) return 40;
  return 32;
};

// ============================================================================
// MOBILE-OPTIMIZED CONSTELLATION LAYER
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
    isMobile: false,
    isTablet: false,
  });

  // Touch state for mobile interactions
  const [touchStartTime, setTouchStartTime] = useState<number>(0);

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
      timeoutId = setTimeout(updateViewport, 100); // Faster response for mobile
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
  // MOBILE-FRIENDLY EVENT HANDLERS
  // ========================================================================

  const handleConstellationInteraction = useCallback(
    (constellationId: string, event?: React.MouseEvent | React.TouchEvent) => {
      // Toggle constellation on tap/click
      setActiveConstellation((prev) =>
        prev === constellationId ? null : constellationId
      );

      // Show tooltip on mobile when activated
      if (viewport.isMobile && event) {
        const constellation = CONSTELLATIONS.find(
          (c) => c.id === constellationId
        );
        if (constellation) {
          const touch =
            "touches" in event ? event.touches[0] : (event as React.MouseEvent);
          const clientX =
            "clientX" in touch ? touch.clientX : (touch as any).clientX;
          const clientY =
            "clientY" in touch ? touch.clientY : (touch as any).clientY;

          setTooltip({
            visible: true,
            x: Math.min(clientX + 10, viewport.width - 280),
            y: Math.max(clientY - 80, 10),
            constellation: {
              name: constellation.name,
              description: constellation.description,
            },
          });

          // Auto-hide tooltip on mobile after 3 seconds
          setTimeout(() => {
            setTooltip((prev) => ({ ...prev, visible: false }));
          }, 3000);
        }
      }
    },
    [viewport]
  );

  const handleDesktopHover = useCallback(
    (constellationId: string, event: React.MouseEvent) => {
      if (viewport.isMobile) return; // Skip hover on mobile

      const constellation = CONSTELLATIONS.find(
        (c) => c.id === constellationId
      );
      if (!constellation) return;

      setHoveredConstellation(constellationId);

      const tooltipWidth = viewport.isTablet ? 250 : 300;
      const tooltipHeight = 100;

      let x = event.clientX + 15;
      let y = event.clientY - 10;

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

  const handleDesktopLeave = useCallback(() => {
    if (viewport.isMobile) return; // Skip hover leave on mobile

    setHoveredConstellation(null);
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      constellation: null,
    });
  }, [viewport]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback(() => {
    setTouchStartTime(Date.now());
  }, []);

  const handleTouchEnd = useCallback(
    (constellationId: string, event: React.TouchEvent) => {
      const touchDuration = Date.now() - touchStartTime;

      // Only trigger on quick taps (not long press or swipe)
      if (touchDuration < 500) {
        event.preventDefault();
        handleConstellationInteraction(constellationId, event);
      }
    },
    [touchStartTime, handleConstellationInteraction]
  );

  // ========================================================================
  // RENDER
  // ========================================================================

  const starSize = getStarSize(viewport, true);
  const strokeWidth = getStrokeWidth(viewport);
  const hoverScale = getHoverScale(viewport);
  const touchAreaSize = getTouchAreaSize(viewport);

  return (
    <>
      {/* Constellation stars with mobile-optimized touch targets */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="relative w-full h-full">
          {CONSTELLATIONS.map((constellation) => (
            <div key={constellation.id} className="absolute inset-0">
              {/* Stars with expanded touch areas for mobile */}
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
                      // Expanded touch area for mobile
                      width: viewport.isMobile ? `${touchAreaSize}px` : "auto",
                      height: viewport.isMobile ? `${touchAreaSize}px` : "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                      // Desktop interactions
                      onClick={
                        !viewport.isMobile
                          ? (e) => {
                              e.stopPropagation();
                              handleConstellationInteraction(
                                constellation.id,
                                e
                              );
                            }
                          : undefined
                      }
                      onMouseEnter={
                        !viewport.isMobile
                          ? (e) => {
                              e.stopPropagation();
                              handleDesktopHover(constellation.id, e);
                            }
                          : undefined
                      }
                      onMouseLeave={
                        !viewport.isMobile
                          ? (e) => {
                              e.stopPropagation();
                              handleDesktopLeave();
                            }
                          : undefined
                      }
                      // Mobile touch interactions
                      onTouchStart={
                        viewport.isMobile ? handleTouchStart : undefined
                      }
                      onTouchEnd={
                        viewport.isMobile
                          ? (e) => {
                              handleTouchEnd(constellation.id, e);
                            }
                          : undefined
                      }
                      whileHover={
                        !viewport.isMobile
                          ? {
                              scale: hoverScale,
                              rotate: [0, 15, -15, 0],
                            }
                          : undefined
                      }
                      whileTap={
                        viewport.isMobile
                          ? {
                              scale: 1.4,
                              transition: { duration: 0.1 },
                            }
                          : undefined
                      }
                      animate={{
                        opacity:
                          activeConstellation === constellation.id
                            ? 1
                            : hoveredConstellation === constellation.id
                            ? 1
                            : 0.9,
                        boxShadow:
                          hoveredConstellation === constellation.id ||
                          activeConstellation === constellation.id
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
                        transition={{
                          duration: viewport.isMobile ? 0.6 : 0.8,
                          delay: index * (viewport.isMobile ? 0.05 : 0.1),
                        }}
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

      {/* Mobile-optimized Tooltip */}
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
              viewport.isMobile
                ? "p-3 max-w-[280px] text-sm" // Mobile: larger text, more padding
                : viewport.isTablet
                ? "p-2.5 max-w-[250px] text-sm" // Tablet
                : "p-3 max-w-xs text-xs" // Desktop
            }`}
          >
            <h3
              className={`text-galaxy-text-accent font-semibold mb-2 ${
                viewport.isMobile ? "text-sm" : "text-xs"
              }`}
            >
              {tooltip.constellation.name}
            </h3>
            <p
              className={`text-galaxy-text-secondary leading-relaxed mb-2 ${
                viewport.isMobile ? "text-sm" : "text-xs"
              }`}
            >
              {tooltip.constellation.description}
            </p>
            <div
              className={`text-galaxy-text-muted italic ${
                viewport.isMobile ? "text-xs" : "text-xs"
              }`}
            >
              {viewport.isMobile ? "Tap" : "Click"} to{" "}
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
