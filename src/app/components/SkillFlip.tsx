"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiAndroidstudio,
  SiMongodb,
  SiPython,
  SiSharp,
  SiJavascript,
  SiVercel,
  SiGithub,
  SiExpo,
  SiBitbucket,
  SiDocker,
  SiMysql,
  SiGit,
  SiLinux,
  SiUbuntu,
  SiApple,
  SiGooglecloud,
  SiAmazon,
  SiOpenai,
  SiTrello,
  SiBootstrap,
  SiCss3,
  SiHtml5,
  SiPrisma,
  SiFramer,
  SiPostgresql,
  SiYarn,
  SiNpm,
  SiPostman,
  SiAuth0,
  SiMui,
  SiShadcnui,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import {
  FaJava,
  FaBrain,
  FaRobot,
  FaTerminal,
  FaWindows,
  FaLock,
} from "react-icons/fa";
import { HiCloud } from "react-icons/hi";
import { TbPrompt } from "react-icons/tb";
import { VscTerminalPowershell } from "react-icons/vsc";
import { Palette, Shield, Component } from "lucide-react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface SkillFlipProps {
  readonly skill: string;
  readonly years: number;
  readonly icon: string;
  readonly forceFlip?: boolean;
}

type IconComponent = React.ComponentType<{ className?: string }>;

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

/**
 * Comprehensive icon mapping for technology skills
 * Maps icon keys to their corresponding React icon components
 */
const ICON_MAP: Record<string, IconComponent> = {
  // Programming Languages
  java: FaJava,
  python: SiPython,
  csharp: SiSharp,
  typescript: SiTypescript,
  javascript: SiJavascript,

  // Frontend Technologies
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  reactnative: SiReact,
  bootstrap: SiBootstrap,
  css: SiCss3,
  html: SiHtml5,
  shadcnui: SiShadcnui,
  nextui: SiMui,
  framer: SiFramer,
  nextauth: SiAuth0,

  // Backend & Infrastructure
  nodejs: SiNodedotjs,
  mongodb: SiMongodb,
  docker: SiDocker,
  mysql: SiMysql,
  prisma: SiPrisma,
  mongoose: SiMongodb,
  postgresql: SiPostgresql,

  // Development Tools
  vscode: DiVisualstudio,
  git: SiGit,
  github: SiGithub,
  bitbucket: SiBitbucket,
  trello: SiTrello,
  androidstudio: SiAndroidstudio,
  yarn: SiYarn,
  npm: SiNpm,
  postman: SiPostman,

  // Platforms & OS
  vercel: SiVercel,
  expo: SiExpo,
  linux: SiLinux,
  ubuntu: SiUbuntu,
  windows: FaWindows,
  macos: SiApple,

  // Cloud & AI
  azure: HiCloud,
  aws: SiAmazon,
  gcp: SiGooglecloud,
  openai: SiOpenai,
  ml: FaBrain,
  ai: FaRobot,
  prompt: TbPrompt,

  // Security & Auth
  argon2: Shield,

  // Terminal & CLI
  bash: FaTerminal,
  powershell: VscTerminalPowershell,
} as const;

/**
 * Animation timing constants for consistent behavior
 */
const ANIMATION_CONFIG = {
  FLIP_DURATION: 4500, // Duration for forced flip state
  TRANSITION_DURATION: "1000ms", // CSS transition duration
} as const;

/**
 * Fallback image configuration
 */
const FALLBACK_IMAGE = {
  src: "/images/profile.png",
  alt: "Skill icon",
} as const;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * SkillFlip Component
 *
 * Interactive 3D flip card displaying technology skills with icons and experience levels.
 * Features hover interactions and programmatic flip control for animations.
 *
 * Features:
 * - 3D CSS flip animation with GPU acceleration
 * - Hover interactions for manual exploration
 * - Programmatic flip control for auto-rotation
 * - Comprehensive icon mapping for technology stack
 * - Accessible with proper semantic structure
 * - Performance optimized with memoization
 *
 * @param skill - Name of the technology/skill
 * @param years - Years of experience with the technology
 * @param icon - Icon identifier for the technology
 * @param forceFlip - External control for flip state (for auto-rotation)
 */
const SkillFlip: React.FC<SkillFlipProps> = React.memo(
  ({ skill, years, icon, forceFlip = false }) => {
    // ========================================================================
    // STATE & MEMOIZED VALUES
    // ========================================================================

    const [isFlipped, setIsFlipped] = useState(false);

    /**
     * Memoized year label for grammatical correctness
     */
    const yearLabel = useMemo(() => (years === 1 ? "year" : "years"), [years]);

    /**
     * Memoized icon component lookup with fallback handling
     */
    const IconComponent = useMemo(
      () => (icon && ICON_MAP[icon] ? ICON_MAP[icon] : null),
      [icon]
    );

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    const handleMouseEnter = useCallback(() => {
      setIsFlipped(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      if (!forceFlip) {
        setIsFlipped(false);
      }
    }, [forceFlip]);

    // ========================================================================
    // EFFECTS
    // ========================================================================

    /**
     * Handle forced flip state for auto-rotation animations
     */
    useEffect(() => {
      if (forceFlip) {
        setIsFlipped(true);
        const timeout = setTimeout(() => {
          setIsFlipped(false);
        }, ANIMATION_CONFIG.FLIP_DURATION);

        return () => clearTimeout(timeout);
      }
    }, [forceFlip]);

    // ========================================================================
    // RENDER
    // ========================================================================

    return (
      <div
        className="w-32 h-16 perspective cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`${skill} - ${years} ${yearLabel} of experience`}
      >
        <div
          className={`
          relative w-full h-full transition-transform duration-1000 transform-gpu 
          border-3 rounded-md ${isFlipped ? "rotate-y-180" : ""}
        `}
          style={{
            transformStyle: "preserve-3d",
            transitionDuration: ANIMATION_CONFIG.TRANSITION_DURATION,
          }}
        >
          {/* Front Face: Technology Icon */}
          <div className="absolute inset-0 backface-hidden flex items-center justify-center rounded bg-galaxy-nebula p-1">
            <div className="w-7 h-7 relative flex items-center justify-center">
              {IconComponent ? (
                <IconComponent
                  className="w-6 h-6 text-galaxy-text-primary"
                  aria-hidden="true"
                />
              ) : (
                <Image
                  src={FALLBACK_IMAGE.src}
                  alt={`${skill} icon`}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="28px"
                />
              )}
            </div>
          </div>

          {/* Back Face: Skill Details */}
          <div
            className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center rounded bg-galaxy-plasma p-1"
            style={{ transform: "rotateY(180deg)" }}
          >
            <span className="text-[12px] font-semibold text-center leading-tight">
              {skill}
            </span>
            <span className="text-xs text-galaxy-text-secondary">
              {years} {yearLabel}
            </span>
          </div>
        </div>

        {/* CSS-in-JS for 3D transforms */}
        <style jsx>{`
          .perspective {
            perspective: 700px;
          }
          .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    );
  }
);

SkillFlip.displayName = "SkillFlip";

export default SkillFlip;
