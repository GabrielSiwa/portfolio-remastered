"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Download,
  Code,
  Sparkles,
  BookOpen,
  Coffee,
  Heart,
} from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // (client-only particles removed; no client-only state required)

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
      className="relative min-h-screen overflow-hidden pt-20"
    >
      {/* Background layers are provided globally by RootLayout's <Background /> */}

      <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 mt-4">
        {/* Profile Image with Enhanced Scroll Behavior */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
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
                src="/images/profile.png"
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
              Software Developer
            </h2>
            <div className="flex items-center space-x-2 text-galaxy-text-accent">
              <span className="text-lg md:text-xl font-medium">
                Tech Enthusiast
              </span>{" "}
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
          <Link
            href="/contact"
            className="galaxy-button flex items-center justify-center space-x-2 text-lg px-8 py-4"
          >
            <Heart className="w-5 h-5" />
            <span>Let&apos;s Collaborate</span>
          </Link>
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
