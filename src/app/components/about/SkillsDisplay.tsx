/**
 * Skills Display Component
 * Handles skill cards rendering for both category and filtered modes
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillFlip from "../SkillFlip";
import { skillExpertise } from "./skillExpertise";
import { animations } from "./animations";
import { useSkillsContext } from "./SkillsContext";

export const SkillsDisplay: React.FC = () => {
  const {
    filteredSkills,
    groupedFilteredSkills,
    isAutoFlipping,
    currentSkillIndex,
    selectedSkill,
    handleSkillClick,
    clearAllFilters,
    setSelectedSkill,
  } = useSkillsContext();
  if (filteredSkills.type === "category") {
    // Category Mode: Normal display with auto-rotation
    return (
      <>
        <motion.div
          key={`category-skills`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {filteredSkills.skills.length > 0 ? (
            filteredSkills.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="transform hover:-translate-y-1 transition cursor-pointer"
                onClick={() => handleSkillClick(skill.name)}
              >
                <SkillFlip
                  skill={skill.name}
                  years={skill.years}
                  icon={skill.icon}
                  forceFlip={
                    (isAutoFlipping && index === currentSkillIndex) ||
                    selectedSkill === skill.name
                  }
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-galaxy-text-muted">
                No skills match the current filters
              </p>
              <motion.button
                onClick={clearAllFilters}
                className="text-sm text-galaxy-text-accent hover:underline mt-2"
                whileHover={{ scale: 1.05 }}
              >
                Clear filters to see all skills
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Skill Details for Category Mode */}
        <AnimatePresence mode="wait">
          {((isAutoFlipping && filteredSkills.skills[currentSkillIndex]) ||
            selectedSkill) && (
            <motion.div
              key={`skill-details-${
                selectedSkill || filteredSkills.skills[currentSkillIndex]?.name
              }`}
              {...animations.skillDetails}
              className="mt-6"
            >
              <div className="rounded-xl border border-galaxy-border/50 bg-galaxy-cosmic/70 p-4 md:p-5 shadow-lg backdrop-blur-sm">
                <motion.h3
                  className="text-lg font-semibold text-galaxy-text-accent mb-3 flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>
                    {selectedSkill ||
                      filteredSkills.skills[currentSkillIndex]?.name}{" "}
                    Expertise
                  </span>
                  {selectedSkill && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedSkill(null)}
                      className="text-galaxy-text-muted hover:text-galaxy-text text-sm"
                    >
                      ✕
                    </motion.button>
                  )}
                </motion.h3>

                <ul className="list-disc pl-5 space-y-3 leading-relaxed text-galaxy-text-secondary marker:text-galaxy-text-accent">
                  {(
                    skillExpertise[
                      (selectedSkill ||
                        filteredSkills.skills[currentSkillIndex]
                          ?.name) as keyof typeof skillExpertise
                    ] || []
                  ).map((bullet, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="text-base"
                    >
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Filtered Mode: Cross-category results
  return (
    <motion.div
      key="filtered-results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {filteredSkills.skills.length > 0 ? (
        <>
          <motion.div
            className="text-center bg-galaxy-surface/30 backdrop-blur-sm rounded-lg p-4 border border-galaxy-border/50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-galaxy-text-secondary">
              Found{" "}
              <span className="text-galaxy-accent font-medium">
                {filteredSkills.totalCount}
              </span>{" "}
              skills matching your filters across all categories
            </p>
          </motion.div>

          {groupedFilteredSkills &&
            Object.entries(groupedFilteredSkills).map(
              ([categoryName, items], categoryIndex) => (
                <motion.div
                  key={categoryName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-galaxy-text-accent flex items-center gap-2">
                    {categoryName}
                    <span className="text-sm font-normal text-galaxy-text-muted">
                      ({items.length} skill{items.length !== 1 ? "s" : ""})
                    </span>
                  </h3>

                  <div className="flex flex-wrap gap-4">
                    {items.map((item, skillIndex) => (
                      <motion.div
                        key={item.skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        className="transform hover:-translate-y-1 transition cursor-pointer"
                        onClick={() => handleSkillClick(item.skill.name)}
                      >
                        <SkillFlip
                          skill={item.skill.name}
                          years={item.skill.years}
                          icon={item.skill.icon}
                          forceFlip={selectedSkill === item.skill.name}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Inline Skill Details for Filtered View */}
                  <AnimatePresence>
                    {selectedSkill &&
                      items.find(
                        (item) => item.skill.name === selectedSkill
                      ) && (
                        <motion.div
                          key={`${categoryName}-skill-details-${selectedSkill}`}
                          {...animations.skillDetails}
                          className="mt-4"
                        >
                          <div className="rounded-xl border border-galaxy-border/50 bg-galaxy-cosmic/70 p-4 md:p-5 shadow-lg backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-semibold text-galaxy-text-accent">
                                {selectedSkill} Expertise
                              </h4>
                              <motion.button
                                onClick={() => setSelectedSkill(null)}
                                className="text-galaxy-text-muted hover:text-galaxy-text text-sm"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                ✕
                              </motion.button>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-galaxy-text-secondary">
                              {(
                                skillExpertise[
                                  selectedSkill as keyof typeof skillExpertise
                                ] || []
                              ).map((expertise, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  {expertise}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </motion.div>
              )
            )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-galaxy-text-muted">
            No skills match the current filters
          </p>
          <motion.button
            onClick={clearAllFilters}
            className="text-sm text-galaxy-text-accent hover:underline mt-2"
            whileHover={{ scale: 1.05 }}
          >
            Clear filters to see all skills
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
