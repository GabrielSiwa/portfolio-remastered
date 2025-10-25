/**
 * Filter Panel Component
 * Advanced multi-dimensional filtering UI for skills
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { filterConfiguration } from "./filterConfig";
import { useSkillsContext } from "./SkillsContext";
import type { Filters } from "./types";

export const FilterPanel: React.FC = () => {
  const {
    showFilters,
    filters,
    hasActiveFilters,
    handleFilterChange,
    clearAllFilters,
  } = useSkillsContext();

  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="bg-galaxy-surface/50 backdrop-blur-sm rounded-xl border border-galaxy-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-galaxy-text">
                Filter Skills
              </h3>
              {hasActiveFilters && (
                <motion.button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-galaxy-accent/20 border border-galaxy-accent/50 text-galaxy-accent rounded-lg hover:bg-galaxy-accent/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All
                </motion.button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(filterConfiguration).map(
                ([filterType, options]) => (
                  <div key={filterType} className="space-y-3">
                    <h4 className="font-medium text-galaxy-text capitalize">
                      {filterType}
                    </h4>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <motion.label
                          key={option.value}
                          className="flex items-center gap-2 cursor-pointer group"
                          whileHover={{ x: 2 }}
                        >
                          <input
                            type="checkbox"
                            checked={filters[
                              filterType as keyof Filters
                            ].includes(option.value)}
                            onChange={() =>
                              handleFilterChange(
                                filterType as keyof Filters,
                                option.value
                              )
                            }
                            className="w-4 h-4 rounded border-galaxy-border bg-galaxy-surface text-galaxy-accent focus:ring-galaxy-accent focus:ring-2"
                          />
                          <span className="text-galaxy-text-secondary group-hover:text-galaxy-text transition-colors">
                            {option.label}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
