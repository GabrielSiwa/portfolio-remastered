"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ============================================================================
// TILT CARD - 3D perspective tilt on hover
// ============================================================================

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  scale?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  glareEnabled = true,
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -tiltAmount;
      const rotateY = ((x - centerX) / centerX) * tiltAmount;

      setTransform({ rotateX, rotateY });

      if (glareEnabled) {
        setGlare({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 0.15,
        });
      }
    },
    [tiltAmount, glareEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
      }}
      whileHover={{ scale }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
      {glareEnabled && (
        <div
          className="pointer-events-none absolute inset-0 rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
    </motion.div>
  );
}

// ============================================================================
// MAGNETIC BUTTON - Subtly follows cursor
// ============================================================================

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      setPosition({ x: distanceX, y: distanceY });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={buttonRef}
      className={`magnetic-hover inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SCROLL PROGRESS - Shows reading progress
// ============================================================================

import { useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

// ============================================================================
// SPLIT TEXT - Character-by-character animation
// ============================================================================

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
}: SplitTextProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ============================================================================
// GRADIENT TEXT - Animated gradient shifting
// ============================================================================

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className = "",
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-galaxy-plasma), var(--color-galaxy-aurora), var(--color-galaxy-stardust))",
        backgroundSize: animate ? "200% 200%" : "100% 100%",
        animation: animate ? "gradient-shift 4s ease infinite" : "none",
      }}
    >
      {children}
    </span>
  );
}

// ============================================================================
// BLUR REVEAL - Text reveals from blur on scroll
// ============================================================================

import { useInView } from "framer-motion";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BlurReveal({
  children,
  className = "",
  delay = 0,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// PARALLAX IMAGE - Depth-based parallax
// ============================================================================

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  intensity = 20,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * intensity;

      setOffset({ x, y });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{ x: offset.x, y: offset.y, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />
    </div>
  );
}

// ============================================================================
// STAGGER CONTAINER - Animates children with stagger
// ============================================================================

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// FLOATING ELEMENT - Gentle floating animation
// ============================================================================

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function FloatingElement({
  children,
  className = "",
  duration = 6,
  distance = 20,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// GLOWING BORDER - Animated gradient border
// ============================================================================

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  animated?: boolean;
}

export function GlowingBorder({
  children,
  className = "",
  borderWidth = 2,
  animated = true,
}: GlowingBorderProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ padding: borderWidth }}
    >
      <div
        className="absolute inset-0 rounded-inherit"
        style={{
          background: `conic-gradient(from var(--border-angle, 0deg), var(--color-galaxy-plasma), var(--color-galaxy-aurora), var(--color-galaxy-stardust), var(--color-galaxy-moonbeam), var(--color-galaxy-plasma))`,
          animation: animated ? "rotate-border 4s linear infinite" : "none",
          borderRadius: "inherit",
        }}
      />
      <div className="relative bg-galaxy-cosmic rounded-inherit">
        {children}
      </div>
    </div>
  );
}
