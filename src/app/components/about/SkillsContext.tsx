/**
 * Skills Context Provider
 * Centralized state management for the About/Skills section
 * Eliminates prop drilling and provides clean separation of concerns
 */

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";

// Data imports
import {
  skillCategories,
  categoryThemes,
  categoryLabels,
  type SkillCategory,
} from "./skillCategories";
import { filterConfiguration } from "./filterConfig";
import type { Filters, FilteredSkillItem, FilteredSkillsResult } from "./types";

// ============================================================================
// CONTEXT TYPES
// ============================================================================

interface SkillsContextState {
  // State values
  activeCategory: SkillCategory;
  isAutoFlipping: boolean;
  currentSkillIndex: number;
  isFlippingSkills: boolean;
  selectedSkill: string | null;
  showFilters: boolean;
  filters: Filters;

  // Computed values
  filteredSkills: FilteredSkillsResult;
  groupedFilteredSkills: Record<string, FilteredSkillItem[]> | null;
  hasActiveFilters: boolean;

  // Category data (exposed for components that need it)
  categoryThemes: typeof categoryThemes;
  categoryLabels: typeof categoryLabels;

  // Actions
  setActiveCategory: (category: SkillCategory) => void;
  setIsAutoFlipping: (value: boolean) => void;
  setSelectedSkill: (skill: string | null) => void;
  setShowFilters: (value: boolean) => void;
  handleCategoryClick: (category: SkillCategory) => void;
  handleSkillClick: (skillName: string) => void;
  handleRefresh: () => void;
  handleFilterChange: (filterType: keyof Filters, value: string) => void;
  clearAllFilters: () => void;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const SkillsContext = createContext<SkillsContextState | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface SkillsProviderProps {
  children: ReactNode;
}

export const SkillsProvider: React.FC<SkillsProviderProps> = ({ children }) => {
  // ========================================================================
  // STATE MANAGEMENT
  // ========================================================================

  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>("frontend");
  const [isAutoFlipping, setIsAutoFlipping] = useState(true);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isFlippingSkills, setIsFlippingSkills] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    experience: [],
    type: [],
    proficiency: [],
  });

  // Performance optimization: Preload categories
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [preloadedCategories, setPreloadedCategories] = useState<Set<string>>(
    new Set(["frontend"])
  );

  // ========================================================================
  // COMPUTED VALUES - Memoized for performance
  // ========================================================================

  /**
   * Advanced filtering system that supports cross-category filtering
   * Returns either category-specific skills or filtered results across all categories
   */
  const filteredSkills: FilteredSkillsResult = useMemo(() => {
    const hasActiveFilters =
      filters.experience.length > 0 ||
      filters.type.length > 0 ||
      filters.proficiency.length > 0;

    // Return category-specific skills if no filters are active
    if (!hasActiveFilters) {
      return {
        type: "category",
        skills: skillCategories[activeCategory],
      };
    }

    // Apply cross-category filtering
    const allFilteredSkills: FilteredSkillItem[] = [];

    Object.entries(skillCategories).forEach(([category, skills]) => {
      skills.forEach((skill) => {
        const matchesExperience =
          filters.experience.length === 0 ||
          filters.experience.some((exp) => {
            const option = filterConfiguration.experience.find(
              (o) => o.value === exp
            );
            return (
              option &&
              skill.years >= option.range[0] &&
              skill.years <= option.range[1]
            );
          });

        const matchesType =
          filters.type.length === 0 ||
          filters.type.some((type) => {
            const option = filterConfiguration.type.find(
              (t) => t.value === type
            );
            return (
              option &&
              option.skills.some((skillName) => skillName === skill.name)
            );
          });

        const matchesProficiency =
          filters.proficiency.length === 0 ||
          filters.proficiency.some((prof) => {
            const option = filterConfiguration.proficiency.find(
              (p) => p.value === prof
            );
            return (
              option &&
              skill.years >= option.range[0] &&
              skill.years <= option.range[1]
            );
          });

        if (matchesExperience && matchesType && matchesProficiency) {
          allFilteredSkills.push({
            skill,
            category: category as SkillCategory,
            categoryName: categoryLabels[category as SkillCategory],
          });
        }
      });
    });

    return {
      type: "filtered",
      skills: allFilteredSkills,
      totalCount: allFilteredSkills.length,
    };
  }, [activeCategory, filters]);

  /**
   * Groups filtered skills by category for organized display
   */
  const groupedFilteredSkills = useMemo(() => {
    if (filteredSkills.type === "category") return null;

    const grouped: Record<string, FilteredSkillItem[]> = {};
    filteredSkills.skills.forEach((item) => {
      if (!grouped[item.categoryName]) {
        grouped[item.categoryName] = [];
      }
      grouped[item.categoryName].push(item);
    });

    return grouped;
  }, [filteredSkills]);

  const hasActiveFilters =
    filters.experience.length > 0 ||
    filters.type.length > 0 ||
    filters.proficiency.length > 0;

  // ========================================================================
  // EFFECTS - Optimized lifecycle management
  // ========================================================================

  /**
   * Performance optimization: Preload next category data
   */
  useEffect(() => {
    const categories = Object.keys(skillCategories) as SkillCategory[];
    const currentIndex = categories.indexOf(activeCategory);
    const nextCategory = categories[(currentIndex + 1) % categories.length];

    setPreloadedCategories(
      (prev) => new Set([...prev, activeCategory, nextCategory])
    );
  }, [activeCategory]);

  /**
   * Auto-flip skills within current category with optimized cleanup
   */
  useEffect(() => {
    const currentSkills =
      filteredSkills.type === "category" ? filteredSkills.skills : [];
    if (!isAutoFlipping || currentSkills.length === 0) return;

    const SKILL_FLIP_INTERVAL = 5000;
    setIsFlippingSkills(true);
    setCurrentSkillIndex(0);

    const skillInterval = setInterval(() => {
      setCurrentSkillIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= currentSkills.length) {
          setIsFlippingSkills(false);
          return 0;
        }
        return nextIndex;
      });
    }, SKILL_FLIP_INTERVAL);

    return () => clearInterval(skillInterval);
  }, [activeCategory, isAutoFlipping, filteredSkills]);

  /**
   * Auto-flip categories with optimized timing
   */
  useEffect(() => {
    if (!isAutoFlipping || isFlippingSkills) return;

    const categories = Object.keys(skillCategories) as SkillCategory[];
    const CATEGORY_CHANGE_DELAY = 100;

    const categoryTimeout = setTimeout(() => {
      const currentIndex = categories.indexOf(activeCategory);
      const nextIndex = (currentIndex + 1) % categories.length;
      setActiveCategory(categories[nextIndex]);
    }, CATEGORY_CHANGE_DELAY);

    return () => clearTimeout(categoryTimeout);
  }, [activeCategory, isAutoFlipping, isFlippingSkills]);

  /**
   * Reset selected skill when switching back to category mode
   */
  useEffect(() => {
    if (filteredSkills.type === "category") {
      setSelectedSkill(null);
    }
  }, [filteredSkills.type]);

  // ========================================================================
  // EVENT HANDLERS - Memoized callbacks for performance
  // ========================================================================

  const handleCategoryClick = useCallback((category: SkillCategory) => {
    setActiveCategory(category);
    setIsAutoFlipping(false);
    setIsFlippingSkills(false);
    setCurrentSkillIndex(0);
    const firstSkill = skillCategories[category][0];
    setSelectedSkill(firstSkill.name);
  }, []);

  const handleSkillClick = useCallback(
    (skillName: string) => {
      // If clicking the same skill that's already selected, deselect it
      if (selectedSkill === skillName) {
        setSelectedSkill(null);
      } else {
        setSelectedSkill(skillName);
      }
      setIsAutoFlipping(false);
      setIsFlippingSkills(false);
    },
    [selectedSkill]
  );

  const handleRefresh = useCallback(() => {
    setIsAutoFlipping(true);
    setActiveCategory("frontend");
    setCurrentSkillIndex(0);
    setIsFlippingSkills(false);
    setSelectedSkill(null);
    setFilters({ experience: [], type: [], proficiency: [] });
  }, []);

  const handleFilterChange = useCallback(
    (filterType: keyof Filters, value: string) => {
      setFilters((prev) => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter((item) => item !== value)
          : [...prev[filterType], value],
      }));
      setSelectedSkill(null);
      setIsAutoFlipping(false);
    },
    []
  );

  const clearAllFilters = useCallback(() => {
    setFilters({ experience: [], type: [], proficiency: [] });
  }, []);

  // ========================================================================
  // CONTEXT VALUE
  // ========================================================================

  const contextValue: SkillsContextState = {
    // State
    activeCategory,
    isAutoFlipping,
    currentSkillIndex,
    isFlippingSkills,
    selectedSkill,
    showFilters,
    filters,

    // Computed
    filteredSkills,
    groupedFilteredSkills,
    hasActiveFilters,

    // Category data
    categoryThemes,
    categoryLabels,

    // Actions
    setActiveCategory,
    setIsAutoFlipping,
    setSelectedSkill,
    setShowFilters,
    handleCategoryClick,
    handleSkillClick,
    handleRefresh,
    handleFilterChange,
    clearAllFilters,
  };

  return (
    <SkillsContext.Provider value={contextValue}>
      {children}
    </SkillsContext.Provider>
  );
};

// ============================================================================
// CUSTOM HOOK
// ============================================================================

/**
 * Custom hook to access Skills Context
 * Throws error if used outside of SkillsProvider
 */
export const useSkillsContext = (): SkillsContextState => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error("useSkillsContext must be used within a SkillsProvider");
  }
  return context;
};
