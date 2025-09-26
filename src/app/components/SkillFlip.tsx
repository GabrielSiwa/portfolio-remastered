"use client";

import React from "react";
import Image from "next/image";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiPython,
  SiSharp,
  SiJavascript,
  SiVercel,
  SiGithub,
  SiExpo,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { HiCloud } from "react-icons/hi"; // Generic cloud icon for Azure

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  java: FaJava,
  python: SiPython,
  csharp: SiSharp,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  tailwindcss: SiTailwindcss,
  mongodb: SiMongodb,
  javascript: SiJavascript,
  vercel: SiVercel,
  azure: HiCloud,
  github: SiGithub,
  reactnative: SiReact,
  expo: SiExpo,
};
type Props = {
  skill: string;
  years: number;
  icon?: string;
};

const SkillFlip: React.FC<Props> = ({ skill, years, icon }) => {
  const yearLabel = years === 1 ? "year" : "years";
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : null;

  return (
    <div className="w-20 h-12 perspective">
      <div
        className="relative w-full h-full transition-transform duration-300 transform-gpu hover:rotate-y-180"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front: icon only */}
        <div className="absolute inset-0 backface-hidden flex items-center justify-center rounded bg-galaxy-nebula p-1">
          <div className="w-7 h-7 relative flex items-center justify-center">
            {IconComponent ? (
              <IconComponent className="w-6 h-6 text-galaxy-text-primary" />
            ) : (
              <Image
                src="/images/profile.png"
                alt={skill}
                fill
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
        </div>

        {/* Back: skill name and years */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center rounded bg-galaxy-plasma p-1"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-xs font-semibold">{skill}</span>
          <span className="text-[10px]">
            {years} {yearLabel}
          </span>
        </div>
      </div>
      <style>{`
        .perspective { perspective: 700px; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .hover\\:rotate-y-180:hover { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default SkillFlip;
