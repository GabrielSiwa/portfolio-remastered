/**
 * Skills Header Component
 * Contains title, filter toggle, and refresh button
 */

import React from "react";
import { motion } from "framer-motion";
import { RotateCcw, Filter } from "lucide-react";
import { useSkillsContext } from "./SkillsContext";

export const SkillsHeader: React.FC = () => {
  const { showFilters, setShowFilters, handleRefresh } = useSkillsContext();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <motion.h2
        className="text-3xl font-bold text-galaxy-text"
        layoutId="skills-title"
      >
        Skills & Technologies
      </motion.h2>

      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300
            ${
              showFilters
                ? "bg-galaxy-accent/20 border-galaxy-accent text-galaxy-accent"
                : "border-galaxy-border text-galaxy-text-muted hover:text-galaxy-text hover:border-galaxy-accent/50"
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter size={16} />
          Filter
        </motion.button>

        <motion.button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-galaxy-border text-galaxy-text-muted hover:text-galaxy-text hover:border-galaxy-accent/50 transition-all duration-300"
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          title="Resume auto-rotation"
        >
          <RotateCcw size={16} />
          Resume
        </motion.button>
      </div>
    </div>
  );
};
