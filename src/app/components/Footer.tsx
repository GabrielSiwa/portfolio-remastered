"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Heart,
  Coffee,
} from "lucide-react";
import { MagneticButton, GradientText, StaggerContainer } from "./ui";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  // Social links
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/gabrielsiwa/",
      icon: Linkedin,
      color: "hover:text-blue-400",
    },
    {
      name: "GitHub",
      href: "https://github.com/GabrielSiwa",
      icon: Github,
      color: "hover:text-gray-300",
    },
    {
      name: "Resume",
      href: "/resume.pdf",
      icon: Download,
      color: "hover:text-galaxy-text-accent",
    },
  ];

  return (
    <footer className="relative bg-galaxy-void border-t border-galaxy-border overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Starfield background */}
        <div className="absolute inset-0 starfield opacity-20" />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-galaxy-stardust rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-galaxy-cosmic/30 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-8">
          {/* Brand & About Section */}
          <motion.div variants={itemVariants}>
            {/* Cap line length so it's easier to read */}
            <div className="mb-6 max-w-prose">
              <GradientText
                animate
                className="text-3xl font-black mb-2 inline-block"
              >
                GABRIEL SIWA
              </GradientText>
              <p className="text-galaxy-text-accent font-medium mb-3">
                Software Developer
              </p>
              <p className="text-galaxy-text-muted leading-relaxed mb-4">
                Passionate about creating innovative solutions with modern web
                technologies. Recent{" "}
                <span className="text-galaxy-text-accent font-semibold">
                  Software Development graduate (2025)
                </span>{" "}
                specializing in building real-world applications and exploring
                cutting-edge technologies including AI and full-stack
                development.
              </p>
            </div>
          </motion.div>

          {/* Contact & Social Section */}
          <motion.div variants={itemVariants} className="md:pl-4">
            {/* Contact Section */}
            <div>
              <h4 className="text-galaxy-text-secondary font-medium mb-4 flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Let&apos;s Connect
              </h4>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <motion.a
                  href="mailto:siwagabrielira8@gmail.com"
                  whileHover={{ x: 5 }}
                  className="flex items-center text-galaxy-text-muted hover:text-galaxy-text-accent transition-colors duration-300 text-sm"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  siwagabrielira8@gmail.com
                </motion.a>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-galaxy-text-muted text-sm"
                >
                  <MapPin className="w-4 h-4 mr-3" />
                  Calgary, Alberta
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <MagneticButton key={social.name} strength={0.3}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg bg-galaxy-cosmic border border-galaxy-border hover:border-galaxy-glow hover-glow-galaxy transition-all duration-300 flex items-center justify-center ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-galaxy-border pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full">
            {/* Copyright */}
            <div className="text-galaxy-text-muted text-sm text-center md:text-left">
              <span>© {currentYear} Gabriel Siwa. All rights reserved.</span>
            </div>

            {/* Made with section */}
            <div className="text-galaxy-text-muted text-sm text-center md:text-right">
              <span className="flex items-center justify-center md:justify-end">
                Made with <Heart className="w-3 h-3 mx-1 text-red-400" /> &{" "}
                <Coffee className="w-3 h-3 ml-1 mr-2 text-amber-400" />
                in Calgary
              </span>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <a href="https://ftp-yyc-webring.vercel.app/#https://gabriel-siwa.vercel.app/?nav=prev">
              ←
            </a>
            <a
              href="https://ftp-yyc-webring.vercel.app/#https://gabriel-siwa.vercel.app/"
              target="_blank"
            >
              <img
                src="https://ftp-yyc-webring.vercel.app/icon.white.svg"
                alt="FTP-YYC Webring"
                style={{ width: "24px", height: "auto", opacity: 0.8 }}
              />
            </a>
            <a href="https://ftp-yyc-webring.vercel.app/#https://gabriel-siwa.vercel.app/?nav=next">
              →
            </a>
          </div>

          {/* Call to Action */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 pt-6 border-t border-galaxy-border/50"
          >
            <p className="text-galaxy-text-secondary text-sm mb-2">
              🚀 Ready to build something amazing together?
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center space-x-2 text-galaxy-text-accent hover:text-galaxy-plasma transition-colors duration-300 text-sm font-medium"
            >
              <span>Let&apos;s start a conversation</span>
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </motion.div> */}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
