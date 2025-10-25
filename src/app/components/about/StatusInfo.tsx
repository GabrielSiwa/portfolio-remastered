/**
 * Status Info Component
 * Displays dynamic status information about auto-rotation
 */

import React from "react";
import { motion } from "framer-motion";
import { useSkillsContext } from "./SkillsContext";

export const StatusInfo: React.FC = () => {
  const {
    filteredSkills,
    isAutoFlipping,
    isFlippingSkills,
    activeCategory,
    categoryLabels,
  } = useSkillsContext();

  // Only show in category mode
  if (filteredSkills.type !== "category") {
    return null;
  }

  return (
    <motion.div
      className="text-center bg-galaxy-surface/30 backdrop-blur-sm rounded-lg p-4 border border-galaxy-border/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-galaxy-text-secondary">
        {isAutoFlipping && isFlippingSkills
          ? `Auto-rotating through ${categoryLabels[activeCategory]} skills...`
          : isAutoFlipping
          ? "Auto-rotating categories..."
          : "Click on any skill icon to explore detailed expertise and stop auto-rotation"}
      </p>
    </motion.div>
  );
};
