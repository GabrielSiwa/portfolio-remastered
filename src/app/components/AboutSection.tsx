"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedReveal from "./AnimatedReveal";
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
        <AnimatedReveal className="mb-12">
          <BioSection />
        </AnimatedReveal>

        {/* Skills Section */}
        <AnimatedReveal>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <SkillsHeader />
            <FilterPanel />
            <CategoryNavigation />
            <StatusInfo />
            <SkillsDisplay />
          </motion.div>
        </AnimatedReveal>
      </main>
    </SkillsProvider>
  );
};

export default AboutPage;
