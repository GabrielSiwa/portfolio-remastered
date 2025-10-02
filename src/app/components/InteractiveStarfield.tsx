"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  layer: number;
  twinkle: boolean;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
}

interface MousePosition {
  x: number;
  y: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const STARFIELD_CONFIG = {
  STAR_COUNT: {
    LAYER_1: 50,
    LAYER_2: 40,
    LAYER_3: 30,
  },
  SHOOTING_STAR: {
    FREQUENCY: 8000,
    DURATION: 2000,
    COUNT: 3,
  },
  NEBULA: {
    SIZE: 120,
    OPACITY: 0.15,
    FOLLOW_SPEED: 0.05, // Reduced for better performance
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const generateStars = (count: number, layer: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + layer * 1000,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.5 + 0.1,
    opacity: Math.random() * 0.8 + 0.2,
    layer,
    twinkle: Math.random() > 0.7,
  }));
};

const generateShootingStar = (id: number): ShootingStar => {
  const startSide = Math.floor(Math.random() * 4);
  let startX, startY, endX, endY;

  switch (startSide) {
    case 0:
      startX = Math.random() * 100;
      startY = -5;
      endX = Math.random() * 100;
      endY = 105;
      break;
    case 1:
      startX = 105;
      startY = Math.random() * 100;
      endX = -5;
      endY = Math.random() * 100;
      break;
    case 2:
      startX = Math.random() * 100;
      startY = 105;
      endX = Math.random() * 100;
      endY = -5;
      break;
    default:
      startX = -5;
      startY = Math.random() * 100;
      endX = 105;
      endY = Math.random() * 100;
  }

  return { id, startX, startY, endX, endY, isActive: true };
};

// ============================================================================
// MAIN COMPONENT - Pure Background Only
// ============================================================================

const InteractiveStarfield: React.FC = () => {
  // ========================================================================
  // STATE MANAGEMENT
  // ========================================================================

  const [stars] = useState<Star[]>(() => [
    ...generateStars(STARFIELD_CONFIG.STAR_COUNT.LAYER_1, 1),
    ...generateStars(STARFIELD_CONFIG.STAR_COUNT.LAYER_2, 2),
    ...generateStars(STARFIELD_CONFIG.STAR_COUNT.LAYER_3, 3),
  ]);

  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [nebulaPosition, setNebulaPosition] = useState<MousePosition>({
    x: 50,
    y: 50,
  });

  // ========================================================================
  // REFS & SCROLL TRACKING
  // ========================================================================

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax transforms for different layers
  const layer1Y = useTransform(scrollY, [0, 1000], [0, -100]);
  const layer2Y = useTransform(scrollY, [0, 1000], [0, -50]);
  const layer3Y = useTransform(scrollY, [0, 1000], [0, -20]);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  // Throttled mouse movement for better performance
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setNebulaPosition((prev) => ({
      x: prev.x + (x - prev.x) * STARFIELD_CONFIG.NEBULA.FOLLOW_SPEED,
      y: prev.y + (y - prev.y) * STARFIELD_CONFIG.NEBULA.FOLLOW_SPEED,
    }));
  }, []);

  // Mouse tracking with requestAnimationFrame for smooth performance
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    const throttledMove = (event: MouseEvent) => {
      rafId = requestAnimationFrame(() => handleMouseMove(event));
    };

    container.addEventListener("mousemove", throttledMove, { passive: true });
    return () => {
      container.removeEventListener("mousemove", throttledMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove]);

  // Shooting stars generation
  useEffect(() => {
    const generateShootingStars = () => {
      setShootingStars((prev) => {
        const activeCount = prev.filter((star) => star.isActive).length;
        if (activeCount >= STARFIELD_CONFIG.SHOOTING_STAR.COUNT) return prev;

        const newStar = generateShootingStar(Date.now());
        return [...prev.filter((star) => star.isActive), newStar];
      });
    };

    const interval = setInterval(
      generateShootingStars,
      STARFIELD_CONFIG.SHOOTING_STAR.FREQUENCY
    );
    return () => clearInterval(interval);
  }, []);

  // Shooting star cleanup
  useEffect(() => {
    const cleanup = setTimeout(() => {
      setShootingStars((prev) =>
        prev.filter(
          (star) =>
            Date.now() - star.id < STARFIELD_CONFIG.SHOOTING_STAR.DURATION
        )
      );
    }, STARFIELD_CONFIG.SHOOTING_STAR.DURATION + 1000);

    return () => clearTimeout(cleanup);
  }, [shootingStars.length]);

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================

  const renderStars = (layer: number) => {
    const layerStars = stars.filter((star) => star.layer === layer);
    const transform = layer === 1 ? layer1Y : layer === 2 ? layer2Y : layer3Y;

    return (
      <motion.div
        className="absolute inset-0"
        style={{ y: transform }}
        key={`layer-${layer}`}
      >
        {layerStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-galaxy-stardust"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            initial={{ opacity: star.opacity }}
            animate={{
              opacity: star.twinkle
                ? [star.opacity * 0.3, star.opacity, star.opacity * 0.3]
                : star.opacity,
              scale: star.twinkle ? [0.8, 1.2, 0.8] : 1,
            }}
            transition={{
              duration: star.twinkle ? 2 + Math.random() * 3 : 0,
              repeat: star.twinkle ? Infinity : 0,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    );
  };

  const renderShootingStars = () => (
    <div className="absolute inset-0">
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-galaxy-accent rounded-full"
          style={{
            background: "linear-gradient(45deg, #ffffff, #64ffda, transparent)",
            filter: "blur(0.5px)",
          }}
          initial={{
            x: `${star.startX}%`,
            y: `${star.startY}%`,
            opacity: 0,
          }}
          animate={{
            x: `${star.endX}%`,
            y: `${star.endY}%`,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: STARFIELD_CONFIG.SHOOTING_STAR.DURATION / 1000,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );

  const renderNebula = () => (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${nebulaPosition.x}%`,
        top: `${nebulaPosition.y}%`,
        width: `${STARFIELD_CONFIG.NEBULA.SIZE}px`,
        height: `${STARFIELD_CONFIG.NEBULA.SIZE}px`,
        background: `radial-gradient(circle, 
          rgba(100, 255, 218, ${STARFIELD_CONFIG.NEBULA.OPACITY}) 0%, 
          rgba(168, 85, 247, ${STARFIELD_CONFIG.NEBULA.OPACITY * 0.5}) 30%, 
          transparent 70%
        )`,
        filter: "blur(20px)",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 360],
      }}
      transition={{
        scale: { duration: 4, repeat: Infinity },
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
      }}
    />
  );

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Base galaxy background */}
      <div className="absolute inset-0 bg-galaxy-void" />

      {/* Original starfield as base layer */}
      <div className="absolute inset-0 starfield opacity-10" />

      {/* Interactive star layers with parallax */}
      <div className="absolute inset-0">
        {renderStars(3)}
        {renderStars(2)}
        {renderStars(1)}
        {renderShootingStars()}
        {renderNebula()}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-galaxy-cosmic/20 to-transparent" />

      {/* Cosmic dust particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-0.5 h-0.5 bg-galaxy-stardust rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveStarfield;
