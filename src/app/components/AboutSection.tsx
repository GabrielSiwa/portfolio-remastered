"use client";

import React from "react";
import { Fade } from "react-awesome-reveal";
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
  return (
    <SkillsProvider>
      <main className="max-w-4xl mx-auto py-12 px-4 relative">
        <SectionParticles count={10} />

        {/* Bio Section */}
        <div className="mb-12">
          <Fade triggerOnce direction="up" fraction={0.3}>
            <BioSection />
          </Fade>
        </div>

        {/* Skills Section */}
        <div className="space-y-8">
          <Fade triggerOnce direction="up" delay={100} fraction={0.3}>
            <SkillsHeader />
          </Fade>

          <Fade triggerOnce direction="up" delay={150} fraction={0.3}>
            <FilterPanel />
          </Fade>

          <Fade triggerOnce direction="up" delay={200} fraction={0.3}>
            <CategoryNavigation />
          </Fade>

          <Fade triggerOnce direction="up" delay={250} fraction={0.3}>
            <StatusInfo />
          </Fade>

          <Fade triggerOnce direction="up" delay={300} fraction={0.3}>
            <SkillsDisplay />
          </Fade>
        </div>
      </main>
    </SkillsProvider>
  );
};

export default AboutPage;
