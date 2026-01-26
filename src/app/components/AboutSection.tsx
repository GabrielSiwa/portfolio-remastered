"use client";

import React from "react";
import SectionParticles from "./SectionParticles";

// Context Provider
import { SkillsProvider } from "./about/SkillsContext";

// Component imports
import { BioSection } from "./about/BioSection";
import { SkillsHeader } from "./about/SkillsHeader";
import { FilterPanel } from "./about/FilterPanel";
import { CategoryNavigation } from "./about/CategoryNavigation";
import { StatusInfo } from "./about/StatusInfo";
import { SkillsDisplay } from "./about/SkillsDisplay";

import { StaggerContainer, BlurReveal, GradientText } from "./ui";

import dynamic from "next/dynamic";
import { useState } from "react";

// Lazy load Three.js component
const SkillGlobe = dynamic(() => import("./three/SkillGlobe"), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center text-galaxy-text-muted">Loading 3D Experience...</div>
});

/**
 * About Page Component
 *
 * Architecture:
 * - Uses Context API for state management (no prop drilling)
 * - Composed of small, focused components
 * - All business logic lives in SkillsContext
 * - Components are purely presentational
 */
const AboutPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "globe">("grid");

  return (
    <SkillsProvider>
      <main className="max-w-4xl mx-auto py-12 px-4 relative">
        <SectionParticles count={10} />

        <div className="text-center mb-12">
          <BlurReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <GradientText>About Me</GradientText>
            </h1>
          </BlurReveal>
        </div>

        <StaggerContainer staggerDelay={0.15} initialDelay={0.2} className="space-y-12">
          {/* Bio Section */}
          <BioSection />

          {/* Skills Section */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <SkillsHeader />
              <div className="flex bg-galaxy-cosmic/50 p-1 rounded-full border border-galaxy-border/30">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-galaxy-glow text-white shadow-lg shadow-galaxy-glow/20"
                      : "text-galaxy-text-muted hover:text-white"
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode("globe")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    viewMode === "globe"
                      ? "bg-galaxy-glow text-white shadow-lg shadow-galaxy-glow/20"
                      : "text-galaxy-text-muted hover:text-white"
                  }`}
                >
                  3D Globe
                </button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <FilterPanel />
                <CategoryNavigation />
                <StatusInfo />
                <SkillsDisplay />
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-1000">
                <div className="glass-card p-4 md:p-8">
                  <div className="text-center mb-4">
                    <p className="text-galaxy-text-muted text-sm italic">
                      Drag to rotate • Scroll to zoom • Explore my technical galaxy
                    </p>
                  </div>
                  <SkillGlobe />
                </div>
              </div>
            )}
          </div>
        </StaggerContainer>
      </main>
    </SkillsProvider>
  );
};

export default AboutPage;
