"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Download,
  Code,
  ArrowDown,
  Sparkles,
  BookOpen,
  Coffee,
  Heart,
} from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Enhanced scroll transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const profileScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7],
    [1, 0.9, 0.6]
  );

  // Hydration fix: Only render particles on client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Typing animation state
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Gabriel Siwa";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Floating animation for profile image
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
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
      className="relative min-h-screen bg-galaxy-void overflow-hidden pt-20"
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 starfield opacity-30" />

      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-galaxy-animated opacity-20" />

      {/* Floating Particles - Only render on client to prevent hydration mismatch */}
      {isClient && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-galaxy-stardust rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Profile Image with Enhanced Scroll Behavior */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          style={{ scale: profileScale }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="mb-4"
        >
          <motion.div animate={floatingAnimation} className="relative">
            {/* Simple Image Container */}
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-galaxy-border glow-galaxy">
              <Image
                src="/profile.png"
                alt="Gabriel Siwa Profile"
                width={224}
                height={224}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Rotating ring around profile */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-galaxy-plasma rounded-full opacity-30"
            />

            {/* Sparkles around profile - Only render on client
            {isClient && (
              <>
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60 * Math.PI) / 180;
                  const radius = 35;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);

                  return (
                    <motion.div
                      key={i}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-galaxy-stardust" />
                    </motion.div>
                  );
                })}
              </>
            )} */}
          </motion.div>
        </motion.div>

        {/* Main Heading with Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-4"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-galaxy-text-primary">I&apos;m </span>
            <span className="text-galaxy-gradient">
              {currentText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-galaxy-plasma"
              >
                |
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Enhanced Subtitle with Multiple Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-galaxy-text-secondary">
              Software Developer Student
            </h2>
            <div className="flex items-center space-x-2 text-galaxy-text-accent">
              <span className="w-1 h-1 bg-galaxy-plasma rounded-full"></span>
              <span className="text-lg md:text-xl font-medium">
                Tech Enthusiast
              </span>
              <span className="w-1 h-1 bg-galaxy-plasma rounded-full"></span>
              <span className="text-lg md:text-xl font-medium">
                AI Explorer
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-md mx-auto">
            {/* JavaScript */}
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
              title="JavaScript"
            >
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-black font-bold text-sm">
                JS
              </div>
            </motion.div>

            {/* TypeScript */}
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              title="TypeScript"
            >
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
                TS
              </div>
            </motion.div>

            {/* React */}
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
              title="React"
            >
              <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center text-white font-bold text-sm">
                ⚛️
              </div>
            </motion.div>

            {/* Python */}
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
              title="Python"
            >
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-sm">
                🐍
              </div>
            </motion.div>

            {/* Java */}
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
              title="Java"
            >
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-sm">
                ☕
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Simplified Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-6 max-w-2xl"
        >
          <p className="text-md text-galaxy-text-muted leading-relaxed">
            Passionate about creating innovative solutions with modern web
            technologies. Currently studying at{" "}
            <span className="text-galaxy-text-accent font-semibold">SAIT</span>{" "}
            while building real-world applications and exploring AI
            technologies.
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
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(139, 95, 191, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="galaxy-button flex items-center justify-center space-x-2 text-lg px-8 py-4"
          >
            <Heart className="w-5 h-5" />
            <span>Let&apos;s Collaborate </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-galaxy-border text-galaxy-text-primary px-8 py-4 rounded-lg hover:bg-galaxy-cosmic hover-glow-galaxy transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span>My learning Journey</span>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="flex space-x-6 mb-12"
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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-galaxy-text-muted"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
        >
          <div className="flex flex-col space-y-4">
            {[Coffee, Code, Sparkles].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                className="p-2 rounded-full bg-galaxy-cosmic/50 border border-galaxy-border text-galaxy-text-accent"
              >
                <Icon className="w-5 h-5" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
