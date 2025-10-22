"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Download, Code, Heart } from "lucide-react";
import { SiReact, SiPython, SiTypescript, SiJavascript } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";

// Subtle status dot component
const StatusDot = ({ status }: { status?: string }) => {
  if (!status) return null;

  const statusConfig: Record<string, { color: string; label: string }> = {
    completed: { color: "bg-green-400", label: "Completed" },
    ongoing: { color: "bg-blue-400", label: "Ongoing" },
    "in-development": { color: "bg-yellow-400", label: "In Development" },
  };

  const config = statusConfig[status] || statusConfig.completed;

  return (
    <div className="relative group">
      <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`} />
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <div className="bg-galaxy-cosmic border border-galaxy-border rounded px-2 py-1 text-[9px] text-galaxy-text-secondary">
          {config.label}
        </div>
      </div>
    </div>
  );
};

// Project type from projects.json
interface Project {
  id: string;
  title: string;
  short: string;
  techStack: string[];
  status?: string;
  image?: string;
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const autoHideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Load projects from projects.json
  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects:", err));
  }, []);

  useEffect(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }

    if (hoveredTech) {
      autoHideTimerRef.current = setTimeout(() => {
        setHoveredTech(null);
      }, 5000);
    }

    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
    };
  }, [hoveredTech]);

  // Lock scroll and handle Escape when full panel is open
  useEffect(() => {
    if (activeTech) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveTech(null);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [activeTech]);

  // Map tech to relevant projects dynamically
  const getTechProjects = (techName: string) => {
    const techMap: Record<string, string[]> = {
      javascript: ["JavaScript"],
      react: ["React", "Next.js"],
      python: ["Python"],
      typescript: ["TypeScript"],
      reactnative: ["React Native", "Expo"],
      java: ["Svelte"], // Java icon shows Svelte projects
    };

    const relevantTechs = techMap[techName] || [];
    const relatedProjects = projects.filter((project) =>
      project.techStack.some((tech) =>
        relevantTechs.some((rt) => tech.includes(rt))
      )
    );

    return relatedProjects.slice(0, 2); // Show max 2 projects
  };

  // Social links data
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/gabrielsiwa/",
      color: "hover:text-blue-400",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/GabrielSiwa",
      color: "hover:text-gray-300",
    },
    {
      name: "Resume",
      icon: Download,
      url: "/resume.pdf",
      color: "hover:text-galaxy-text-accent",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-20"
    >
      <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Main Heading with Splash Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "anticipate" }}
          className="mb-4"
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
            <motion.span
              className="text-galaxy-gradient inline-block"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [1.05, 0.98, 1], opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              GABRIEL SIWA
            </motion.span>

            <motion.span
              aria-hidden
              className="absolute block w-48 h-48 rounded-full bg-galaxy-plasma/10 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1.6], opacity: [0.6, 0.2, 0] }}
              transition={{ delay: 0.55, duration: 0.9 }}
            />
          </h1>
        </motion.div>

        {/* Enhanced Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-galaxy-text-secondary">
              Software Developer
            </h2>
            <div className="flex items-center space-x-2 text-galaxy-text-accent">
              <span className="text-lg md:text-xl font-medium">
                Tech Enthusiast
              </span>
              <span className="text-lg md:text-xl font-medium">
                AI Explorer
              </span>
            </div>
          </div>
        </motion.div>

        {/* Floating Tech Orbits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: activeTech ? 0 : 1,
            scale: activeTech ? 0.95 : 1,
          }}
          transition={{ delay: activeTech ? 0 : 1.0, duration: 0.35 }}
          style={{ pointerEvents: activeTech ? "none" : "auto" }}
          className="mb-4 mt-4 relative w-full max-w-lg mx-auto h-64"
        >
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              animate={{
                rotate: 360,
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.4)",
                  "0 0 40px rgba(139, 92, 246, 0.6)",
                  "0 0 20px rgba(139, 92, 246, 0.4)",
                ],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-galaxy-glow to-galaxy-starfield flex items-center justify-center border-2 border-galaxy-cosmic"
            >
              <Code className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Orbital Paths */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="absolute border border-galaxy-border/20 rounded-full"
              style={{
                width: "200px",
                height: "200px",
                left: "-100px",
                top: "-100px",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute border border-galaxy-border/10 rounded-full"
              style={{
                width: "280px",
                height: "280px",
                left: "-140px",
                top: "-140px",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Orbiting Tech Icons - Inner Ring */}
          {[
            {
              Icon: SiJavascript,
              name: "javascript",
              color: "bg-yellow-400",
              borderColor: "border-yellow-500/40",
              delay: 0,
              radius: 100,
              duration: 12,
            },
            {
              Icon: SiReact,
              name: "react",
              color: "bg-cyan-600",
              borderColor: "border-cyan-500/40",
              delay: 4,
              radius: 100,
              duration: 12,
            },
            {
              Icon: SiPython,
              name: "python",
              color: "bg-green-500",
              borderColor: "border-green-500/40",
              delay: 8,
              radius: 100,
              duration: 12,
            },
          ].map((tech, index) => (
            <motion.div
              key={`inner-${index}`}
              className="absolute top-1/2 left-1/2"
              style={{
                marginLeft: "-20px",
                marginTop: "-20px",
              }}
              animate={{
                x: [
                  Math.cos((tech.delay * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 1) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 2) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 3) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 4) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 5) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 6) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 7) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 8) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 9) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 10) * Math.PI) / 6) * tech.radius,
                  Math.cos(((tech.delay + 11) * Math.PI) / 6) * tech.radius,
                  Math.cos((tech.delay * Math.PI) / 6) * tech.radius,
                ],
                y: [
                  Math.sin((tech.delay * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 1) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 2) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 3) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 4) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 5) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 6) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 7) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 8) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 9) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 10) * Math.PI) / 6) * tech.radius,
                  Math.sin(((tech.delay + 11) * Math.PI) / 6) * tech.radius,
                  Math.sin((tech.delay * Math.PI) / 6) * tech.radius,
                ],
              }}
              transition={{
                duration: tech.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
                onClick={() => setActiveTech(tech.name)}
                onTap={() => setActiveTech(tech.name)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95, rotate: 360 }}
                className={`w-12 h-12 ${tech.color} rounded-full flex items-center justify-center border-2 ${tech.borderColor} shadow-lg cursor-pointer`}
                style={{
                  boxShadow: `0 0 20px ${tech.color.replace(
                    "bg-",
                    "rgba("
                  )}, 0.4)`,
                }}
              >
                <tech.Icon className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          ))}

          {/* Orbiting Tech Icons - Outer Ring */}
          {[
            {
              Icon: SiTypescript,
              name: "typescript",
              color: "bg-blue-500",
              borderColor: "border-blue-500/40",
              delay: 0,
              radius: 140,
              duration: 16,
            },
            {
              Icon: TbBrandReactNative,
              name: "reactnative",
              color: "bg-cyan-900",
              borderColor: "border-cyan-500/40",
              delay: 5.33,
              radius: 140,
              duration: 16,
            },
            {
              Icon: FaJava,
              name: "java",
              color: "bg-orange-500",
              borderColor: "border-orange-500/40",
              delay: 10.66,
              radius: 140,
              duration: 16,
            },
          ].map((tech, index) => (
            <motion.div
              key={`outer-${index}`}
              className="absolute top-1/2 left-1/2"
              style={{
                marginLeft: "-20px",
                marginTop: "-20px",
              }}
              animate={{
                x: [
                  Math.cos((tech.delay * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 1) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 2) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 3) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 4) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 5) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 6) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 7) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 8) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 9) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 10) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 11) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 12) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 13) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 14) * Math.PI) / 8) * tech.radius,
                  Math.cos(((tech.delay + 15) * Math.PI) / 8) * tech.radius,
                  Math.cos((tech.delay * Math.PI) / 8) * tech.radius,
                ],
                y: [
                  Math.sin((tech.delay * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 1) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 2) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 3) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 4) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 5) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 6) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 7) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 8) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 9) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 10) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 11) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 12) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 13) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 14) * Math.PI) / 8) * tech.radius,
                  Math.sin(((tech.delay + 15) * Math.PI) / 8) * tech.radius,
                  Math.sin((tech.delay * Math.PI) / 8) * tech.radius,
                ],
              }}
              transition={{
                duration: tech.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
                onClick={() => setActiveTech(tech.name)}
                onTap={() => setActiveTech(tech.name)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95, rotate: 360 }}
                className={`w-12 h-12 ${tech.color} rounded-full flex items-center justify-center border-2 ${tech.borderColor} shadow-lg cursor-pointer`}
                style={{
                  boxShadow: `0 0 20px ${tech.color.replace(
                    "bg-",
                    "rgba("
                  )}, 0.4)`,
                }}
              >
                <tech.Icon className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          ))}

          {/* Fixed Stable Mini Preview Panel - Only on Hover */}
          <AnimatePresence>
            {hoveredTech && !activeTech && (
              <motion.div
                key="hover-preview"
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute left-1/2 transform -translate-x-1/2 z-60 pointer-events-none w-[280px] max-w-[90vw] ${
                  getTechProjects(hoveredTech).length > 2
                    ? "-bottom-12"
                    : "-bottom-24"
                }`}
              >
                <div className="bg-galaxy-cosmic border border-galaxy-border rounded-lg p-3 shadow-2xl backdrop-blur-sm">
                  <div className="text-[10px] text-galaxy-text-muted mb-2 uppercase tracking-wide">
                    {hoveredTech} Related Projects
                  </div>

                  {/* Dynamic content container - auto-adjusts height */}
                  <div className="space-y-2">
                    {getTechProjects(hoveredTech).length > 0 ? (
                      getTechProjects(hoveredTech).map((project, idx) => (
                        <div
                          key={project.id}
                          className={
                            idx > 0
                              ? "pt-2 border-t border-galaxy-border/30"
                              : ""
                          }
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <StatusDot status={project.status} />
                            <div className="text-xs font-bold text-galaxy-text-secondary flex-1 line-clamp-2">
                              {project.title}
                            </div>
                          </div>
                          <div className="text-[10px] text-galaxy-text-muted leading-relaxed line-clamp-3">
                            {project.short}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-galaxy-text-muted text-center py-2">
                        {hoveredTech === "python"
                          ? "Worked with Python"
                          : "Experience with this tech"}
                      </div>
                    )}
                  </div>
                </div>
                {/* Arrow pointer */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-galaxy-border" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Simplified Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-6 max-w-2xl"
        >
          <p className="text-md text-galaxy-text-muted leading-relaxed">
            I love solving problems through code and bringing creative ideas to
            life. Whether it&apos;s building web applications or experimenting
            with new technologies, I&apos;m always excited to learn and create
            something meaningful.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <motion.button
            type="button"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(139, 95, 191, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.open("https://www.linkedin.com/in/gabrielsiwa", "_blank");
            }}
            aria-label="Message Gabriel on LinkedIn"
            className="galaxy-button flex items-center justify-center space-x-2 text-lg px-8 py-4"
          >
            <Heart className="w-5 h-5" />
            <span>Let&apos;s Collaborate</span>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="flex space-x-6 py-12"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-full bg-galaxy-cosmic border border-galaxy-border hover-glow-galaxy transition-all duration-300 ${link.color}`}
              title={link.name}
            >
              <link.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Full Project Showcase Panel - Slides from Bottom on Click */}
        <AnimatePresence>
          {activeTech && (
            <motion.div
              key="project-showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
              aria-hidden={false}
            >
              {/* Backdrop overlay - click to close */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setActiveTech(null)}
              />

              {/* Project Panel */}
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full md:w-3/4 lg:w-2/3 max-h-[85vh] overflow-auto bg-galaxy-cosmic border border-galaxy-border rounded-t-2xl md:rounded-2xl p-6 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-galaxy-text-secondary">
                      {activeTech?.toUpperCase()} Projects
                    </h3>
                    <div className="text-sm text-galaxy-text-muted mt-1">
                      Projects using {activeTech}
                    </div>
                  </div>
                  <button
                    aria-label="Close projects showcase"
                    onClick={() => setActiveTech(null)}
                    className="text-galaxy-text-muted hover:text-white text-2xl leading-none transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getTechProjects(activeTech || "").map((project) => (
                    <article
                      key={project.id}
                      className="bg-galaxy-surface/50 border border-galaxy-border/30 rounded-xl p-4 hover:border-galaxy-border transition-all"
                    >
                      <div className="flex gap-4">
                        {/* Project Image/Placeholder */}
                        <div className="w-28 h-20 bg-galaxy-void rounded-lg overflow-hidden flex-shrink-0">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-700 to-pink-600">
                              <span className="text-white text-2xl font-bold opacity-40">
                                {project.title.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Project Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-sm font-bold text-galaxy-text-secondary leading-tight">
                              {project.title}
                            </h4>
                            <StatusDot status={project.status} />
                          </div>
                          <p className="text-xs text-galaxy-text-muted leading-relaxed mb-3">
                            {project.short}
                          </p>

                          {/* Tech Stack Tags */}
                          <div className="flex gap-2 flex-wrap">
                            {(project.techStack || [])
                              .slice(0, 5)
                              .map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[10px] px-2 py-1 bg-galaxy-border/10 text-galaxy-text-accent rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}

                  {/* Empty State */}
                  {getTechProjects(activeTech || "").length === 0 && (
                    <div className="col-span-2 text-center py-12 text-galaxy-text-muted">
                      <Code className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>
                        {activeTech === "python"
                          ? "Worked with Python on various projects"
                          : `No ${activeTech} projects available yet`}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Hero;
