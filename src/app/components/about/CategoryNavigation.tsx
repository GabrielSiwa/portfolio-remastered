/**
 * Category Navigation Component
 * Displays category selection buttons with active state
 */

import React from "react";
import { motion } from "framer-motion";
import { animations } from "./animations";
import { useSkillsContext } from "./SkillsContext";
import type { SkillCategory } from "./skillCategories";

export const CategoryNavigation: React.FC = () => {
  const {
    filteredSkills,
    activeCategory,
    categoryThemes,
    categoryLabels,
    handleCategoryClick,
  } = useSkillsContext();

  // Only show in category mode
  if (filteredSkills.type !== "category") {
    return null;
  }

  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center"
      variants={animations.staggerChildren}
      initial="initial"
      animate="animate"
    >
      {Object.entries(categoryLabels).map(([category, label]) => (
        <motion.button
          key={category}
          onClick={() => handleCategoryClick(category as SkillCategory)}
          className={`
            px-6 py-3 rounded-xl font-medium transition-all duration-300 border
            ${
              activeCategory === category
                ? `bg-gradient-to-r ${
                    categoryThemes[category as SkillCategory]
                  } text-galaxy-text border-current`
                : "bg-galaxy-surface/50 border-galaxy-border text-galaxy-text-muted hover:text-galaxy-text hover:border-galaxy-accent/50"
            }
          `}
          variants={animations.skillCard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {label}
        </motion.button>
      ))}
    </motion.div>
  );
};
