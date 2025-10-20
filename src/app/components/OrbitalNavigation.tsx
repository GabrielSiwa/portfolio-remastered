"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Home, User, FolderOpen, Sparkles } from "lucide-react";

// ============================================================================
// SCROLL DETECTION HOOK
// ============================================================================

const useScrollVisibility = () => {
  const [isTopNavVisible, setIsTopNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show TopNav when at top or scrolling up
      if (currentScrollY < 100 || currentScrollY < lastScrollY) {
        setIsTopNavVisible(true);
      }
      // Hide TopNav when scrolling down past 100px
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsTopNavVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return isTopNavVisible;
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
}

interface OrbitalPosition {
  x: number;
  y: number;
  angle: number;
}

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
    color: "from-blue-400 to-blue-600",
    glowColor: "rgba(59, 130, 246, 0.6)",
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    icon: User,
    color: "from-purple-400 to-purple-600",
    glowColor: "rgba(147, 51, 234, 0.6)",
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: FolderOpen,
    color: "from-green-400 to-green-600",
    glowColor: "rgba(34, 197, 94, 0.6)",
  },
];

// ============================================================================
// ORBITAL CALCULATIONS
// ============================================================================

const calculateOrbitPosition = (
  index: number,
  totalItems: number,
  radius: number,
  rotationOffset: number = 0
): OrbitalPosition => {
  const angleStep = (2 * Math.PI) / totalItems;
  const angle = index * angleStep + rotationOffset;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    angle: angle,
  };
};

// ============================================================================
// ORBITAL NAVIGATION COMPONENT
// ============================================================================

interface OrbitalNavigationProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const OrbitalNavigation: React.FC<OrbitalNavigationProps> = ({
  size = "medium",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const orbitRef = useRef<HTMLDivElement>(null);

  // Use scroll detection to determine visibility
  const isTopNavVisible = useScrollVisibility();
  const isOrbitalVisible = !isTopNavVisible; // Show when top nav is hidden

  // Size configurations
  const sizeConfig = {
    small: { radius: 60, centerSize: 32, itemSize: 24 },
    medium: { radius: 80, centerSize: 40, itemSize: 28 },
    large: { radius: 100, centerSize: 48, itemSize: 32 },
  };

  const config = sizeConfig[size];

  // ========================================================================
  // ORBITAL ROTATION ANIMATION
  // ========================================================================

  useEffect(() => {
    if (!isOrbitalVisible) return;

    const interval = setInterval(() => {
      setRotationOffset((prev) => prev + 0.005); // Slow continuous rotation
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isOrbitalVisible]);

  // ========================================================================
  // HOVER EFFECTS
  // ========================================================================

  const handleCenterHover = (hovering: boolean) => {
    setIsHovered(hovering);
    setIsExpanded(hovering);

    if (hovering) {
      controls.start({
        scale: 1.1,
        boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)",
        transition: { duration: 0.3 },
      });
    } else {
      controls.start({
        scale: 1,
        boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
        transition: { duration: 0.3 },
      });
    }
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  if (!isOrbitalVisible) return null;

  return (
    <AnimatePresence>
      {isOrbitalVisible && (
        <motion.div
          className={`fixed bottom-8 right-8 z-50 ${className}`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
        >
          <div
            ref={orbitRef}
            className="relative"
            style={{
              width: `${config.radius * 2 + config.itemSize * 2}px`,
              height: `${config.radius * 2 + config.itemSize * 2}px`,
            }}
            onMouseEnter={() => handleCenterHover(true)}
            onMouseLeave={() => handleCenterHover(false)}
          >
            {/* Central Hub */}
            <motion.div
              animate={controls}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-gradient-to-r from-purple-500 to-pink-500 rounded-full cursor-pointer
                     flex items-center justify-center border-2 border-purple-300/30
                     backdrop-blur-sm"
              style={{
                width: `${config.centerSize}px`,
                height: `${config.centerSize}px`,
              }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            {/* Orbiting Navigation Items */}
            {NAVIGATION_ITEMS.map((item, index) => {
              const position = calculateOrbitPosition(
                index,
                NAVIGATION_ITEMS.length,
                config.radius,
                rotationOffset
              );

              return (
                <motion.div
                  key={item.id}
                  className="absolute"
                  style={{
                    left: `50%`,
                    top: `50%`,
                    transform: `translate(-50%, -50%)`,
                  }}
                  animate={{
                    x: position.x,
                    y: position.y,
                    rotate: isExpanded
                      ? position.angle * (180 / Math.PI) + 90
                      : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={`relative rounded-full cursor-pointer flex items-center justify-center
                             bg-gradient-to-r ${item.color} border-2 border-white/20
                             backdrop-blur-sm hover:border-white/40 transition-all duration-300`}
                      style={{
                        width: `${config.itemSize}px`,
                        height: `${config.itemSize}px`,
                      }}
                      whileHover={{
                        scale: 1.3,
                        boxShadow: `0 0 30px ${item.glowColor}`,
                        zIndex: 10,
                      }}
                      whileTap={{ scale: 0.9 }}
                      onHoverStart={() => setActiveItem(item.id)}
                      onHoverEnd={() => setActiveItem(null)}
                    >
                      <item.icon className="w-3 h-3 text-white" />

                      {/* Orbital Trail Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent"
                        style={{
                          background: `conic-gradient(from ${position.angle}rad, transparent, ${item.glowColor}, transparent)`,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  </Link>

                  {/* Tooltip */}
                  {activeItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2
                           bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg
                           border border-white/20 whitespace-nowrap pointer-events-none"
                    >
                      {item.label}
                      <div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                                w-2 h-2 bg-black/80 rotate-45 border-r border-b border-white/20"
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Orbital Rings (Visual Enhancement) */}
            {isExpanded && (
              <>
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       border border-purple-400/20 rounded-full pointer-events-none"
                  style={{
                    width: `${config.radius * 2}px`,
                    height: `${config.radius * 2}px`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       border border-purple-400/10 rounded-full pointer-events-none"
                  style={{
                    width: `${config.radius * 2.5}px`,
                    height: `${config.radius * 2.5}px`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
              </>
            )}

            {/* Gravitational Field Effect */}
            {isHovered && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     bg-gradient-radial from-purple-500/10 to-transparent rounded-full pointer-events-none"
                style={{
                  width: `${config.radius * 3}px`,
                  height: `${config.radius * 3}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrbitalNavigation;
