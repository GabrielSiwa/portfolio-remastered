"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download, Code, Heart } from "lucide-react";
import { SiReact, SiPython, SiTypescript, SiJavascript } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Splash reveal will animate the full name instead of typing

  // Floating animation for profile image
  // const floatingAnimation = {
  //   y: [0, -20, 0],
  //   transition: {
  //     duration: 4,
  //     repeat: Infinity,
  //     ease: "easeInOut" as const,
  //   },
  // };

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

      <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Profile Image with Enhanced Scroll Behavior */}
        {/* <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="mb-4"
        > */}
        {/* <motion.div animate={floatingAnimation} className="relative">
            Simple Image Container
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-galaxy-border glow-galaxy">
              <Image
                src="/images/profile.png"
                alt="Gabriel Siwa Profile"
                width={224}
                height={224}
                className="w-full h-full object-cover"
                priority
              />
            </div> */}

        {/* Rotating ring around profile
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-galaxy-plasma rounded-full opacity-30"
            /> */}

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
        {/* </motion.div>
        </motion.div> */}

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

            {/* subtle splash burst */}
            <motion.span
              aria-hidden
              className="absolute block w-48 h-48 rounded-full bg-galaxy-plasma/10 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1.6], opacity: [0.6, 0.2, 0] }}
              transition={{ delay: 0.55, duration: 0.9 }}
            />
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

        {/* Floating Tech Orbits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
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
              color: "bg-yellow-400",
              borderColor: "border-yellow-500/40",
              delay: 0,
              radius: 100,
              duration: 12,
            },
            {
              Icon: SiReact,
              color: "bg-cyan-600",
              borderColor: "border-cyan-500/40",
              delay: 4,
              radius: 100,
              duration: 12,
            },
            {
              Icon: SiPython,
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
                whileHover={{ scale: 1.3, rotate: 360 }}
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
              color: "bg-blue-500",
              borderColor: "border-blue-500/40",
              delay: 0,
              radius: 140,
              duration: 16,
            },
            {
              Icon: TbBrandReactNative,
              color: "bg-cyan-900",
              borderColor: "border-cyan-500/40",
              delay: 5.33,
              radius: 140,
              duration: 16,
            },
            {
              Icon: FaJava,
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
                whileHover={{ scale: 1.3, rotate: 360 }}
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

        {/* Tech Stack Icons */}
        {/* <motion.div
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
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default Hero;
