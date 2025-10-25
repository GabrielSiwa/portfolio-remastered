"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ConstellationLayer from "./components/ConstellationLayer";
import IntroLoader from "./components/IntroLoader";
import dynamic from "next/dynamic";

// Lazy load below-fold sections for better LCP performance
const AboutSection = dynamic(() => import("./components/AboutSection"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-galaxy-text-accent">Loading...</div>
    </div>
  ),
});

const ContactSection = dynamic(() => import("./components/ContactSection"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-galaxy-text-accent">Loading...</div>
    </div>
  ),
});

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [shouldShowIntro, setShouldShowIntro] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip intro if user prefers reduced motion
      setShouldShowIntro(false);
      setShowContent(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      {/* Black screen backdrop - ensures black background before intro */}
      {!showContent && <div className="fixed inset-0 z-[9998] bg-black" />}

      {/* Intro Loader - blocks content until complete */}
      {shouldShowIntro && <IntroLoader onComplete={handleIntroComplete} />}

      {/* Main content - hidden until intro completes */}
      <main
        className="min-h-screen relative"
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {/* ConstellationLayer exclusive to homepage */}
        <ConstellationLayer />

        <section id="hero">
          <Hero />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  );
}
