"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Filter } from "lucide-react";
import SkillFlip from "./SkillFlip";
import AnimatedReveal from "./AnimatedReveal";
import SectionParticles from "./SectionParticles";

// ============================================================================
// TYPE DEFINITIONS - Modern TypeScript with strict typing
// ============================================================================

type SkillCategory = keyof typeof skillCategories;

interface Skill {
  readonly name: string;
  readonly years: number;
  readonly icon: string;
}

interface FilteredSkillItem {
  skill: Skill;
  category: SkillCategory;
  categoryName: string;
}

interface Filters {
  experience: string[];
  type: string[];
  proficiency: string[];
}

type FilteredSkillsResult =
  | { type: "category"; skills: readonly Skill[] }
  | { type: "filtered"; skills: FilteredSkillItem[]; totalCount: number };

// ============================================================================
// DATA CONFIGURATION - Centralized and immutable
// ============================================================================

/**
 * Comprehensive skill categorization with experience levels and icon mappings
 * Organized by technical domain for optimal navigation and filtering
 */
const skillCategories = {
  frontend: [
    { name: "TypeScript", years: 2, icon: "typescript" },
    { name: "React", years: 2, icon: "react" },
    { name: "Next.js", years: 2, icon: "nextjs" },
    { name: "JavaScript", years: 4, icon: "javascript" },
    { name: "Tailwind CSS", years: 2, icon: "tailwindcss" },
  ],
  backend: [
    { name: "Java", years: 3, icon: "java" },
    { name: "Python", years: 3, icon: "python" },
    { name: "Node.js", years: 2, icon: "nodejs" },
    { name: "MongoDB", years: 2, icon: "mongodb" },
    { name: "Azure Cloud", years: 1, icon: "azure" },
    { name: "C#", years: 1, icon: "csharp" },
  ],
  mobile: [
    { name: "React Native", years: 2, icon: "reactnative" },
    { name: "Expo Go", years: 2, icon: "expo" },
  ],
  ai: [
    { name: "OpenAI API", years: 1, icon: "openai" },
    { name: "Prompt Engineering", years: 1, icon: "prompt" },
    { name: "Azure AI", years: 1, icon: "azure" },
    { name: "AI Integration", years: 1, icon: "ai" },
    { name: "Machine Learning", years: 1, icon: "ml" },
  ],
  tools: [
    { name: "Visual Studio Code", years: 6, icon: "vscode" },
    { name: "Git", years: 4, icon: "github" },
    { name: "BitBucket", years: 1, icon: "bitbucket" },
    { name: "Docker", years: 1, icon: "docker" },
    { name: "Vercel", years: 1, icon: "vercel" },
    { name: "Trello", years: 1, icon: "trello" },
  ],
} as const;

/**
 * Visual theme system for skill categories
 * Consistent gradient patterns with accessibility considerations
 */
const categoryThemes = {
  frontend: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
  backend: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  mobile: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
  ai: "from-orange-500/20 to-red-500/20 border-orange-500/30",
  tools: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
} as const;

/**
 * Human-readable category labels for UI presentation
 */
const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  ai: "AI & Machine Learning",
  tools: "Tools & DevOps",
} as const;

/**
 * Advanced multi-dimensional filtering system
 * Supports experience level, technology type, and proficiency filtering
 */
const filterConfiguration = {
  experience: [
    { label: "1 Year", value: "1", range: [1, 1] },
    { label: "2 Years", value: "2", range: [2, 2] },
    { label: "3 Years", value: "3", range: [3, 3] },
    { label: "4+ years", value: "4", range: [4, 10] },
  ],
  type: [
    {
      label: "Programming Languages",
      value: "languages",
      skills: ["TypeScript", "JavaScript", "Java", "Python", "C#"] as const,
    },
    {
      label: "Frameworks",
      value: "frameworks",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "React Native",
        "Expo Go",
      ] as const,
    },
    { label: "Databases", value: "databases", skills: ["MongoDB"] as const },
    {
      label: "Cloud & DevOps",
      value: "cloud",
      skills: ["Azure Cloud", "Azure AI", "Docker", "Vercel"] as const,
    },
    {
      label: "Tools",
      value: "tools",
      skills: ["Visual Studio Code", "Git", "BitBucket", "Trello"] as const,
    },
    {
      label: "AI/ML",
      value: "ai",
      skills: [
        "OpenAI API",
        "Prompt Engineering",
        "Azure AI",
        "AI Integration",
        "Machine Learning",
      ] as const,
    },
  ],
  proficiency: [
    { label: "Beginner", value: "beginner", range: [1, 1] },
    { label: "Intermediate", value: "intermediate", range: [2, 3] },
    { label: "Advanced", value: "advanced", range: [4, 10] },
  ],
} as const;

/**
 * Detailed expertise descriptions for each technology
 * Provides comprehensive insight into practical capabilities
 */
const skillExpertise = {
  // Frontend Technologies
  React: [
    "Component Creation And Structure",
    "JSX Syntax And Rendering",
    "Props And State Management",
    "Hooks (useState, useEffect)",
    "Event Handling And Forms",
    "Component Lifecycle Understanding",
    "Context API For Simple State Sharing",
    "Basic Performance Optimization",
  ],
  "Next.js": [
    "File-Based Routing System",
    "Page Components And Layouts",
    "API Routes Development",
    "Static Site Generation Basics",
    "Image Optimization",
    "Deployment On Vercel",
    "Basic SEO Implementation",
  ],
  TypeScript: [
    "Basic Type Annotations",
    "Interface Definition",
    "Type Safety Implementation",
    "Props Typing In React",
    "Basic Generics Usage",
    "Error Prevention Through Types",
  ],
  JavaScript: [
    "ES6+ Syntax And Features",
    "DOM Manipulation",
    "Event Handling",
    "Async/Await And Promises",
    "Array Methods And Iteration",
    "API Integration With Fetch",
    "Local Storage Management",
  ],
  "Tailwind CSS": [
    "Utility-First CSS Approach",
    "Responsive Design Implementation",
    "Component Styling",
    "Custom Configuration",
    "Dark Mode Implementation",
    "Animation Classes",
  ],

  // Backend Technologies
  Java: [
    "Object-Oriented Programming",
    "Basic Syntax And Data Structures",
    "JDBC Database Connectivity",
    "RESTful API Development",
    "Spring Boot Applications",
    "Exception Handling",
    "Unit Testing With JUnit",
  ],
  Python: [
    "Basic Syntax And Data Types",
    "File Handling And I/O",
    "Web Development With Flask/Django",
    "REST API Development",
    "Data Processing With Pandas",
    "Web Scraping With BeautifulSoup",
    "Automation Scripts",
  ],
  "C#": [
    "Object-Oriented Programming Basics",
    "Basic Syntax And Data Types",
    "Database Operations",
    "ASP.NET Core Web APIs",
    "Entity Framework Basics",
    "Unit Testing",
  ],
  "Node.js": [
    "Server-Side JavaScript",
    "Express.js Framework",
    "RESTful API Development",
    "Database Integration",
    "Middleware Implementation",
    "Authentication Systems",
  ],
  MongoDB: [
    "Document Database Operations",
    "CRUD Operations",
    "Schema Design",
    "Aggregation Pipelines",
    "Index Optimization",
    "Database Performance",
  ],
  "Azure Cloud": [
    "Cloud Service Deployment",
    "Resource Management",
    "Basic DevOps Practices",
    "Service Integration",
  ],

  // Mobile Development
  "React Native": [
    "Cross-Platform Development",
    "Native Component Integration",
    "Navigation Systems",
    "State Management",
    "API Integration",
    "Mobile-Specific Features",
  ],
  "Expo Go": [
    "Rapid Prototyping",
    "Development Workflow",
    "Device Testing",
    "Build Management",
  ],

  // AI & Machine Learning
  "OpenAI API": [
    "API Integration",
    "GPT Model Implementation",
    "Prompt Design",
    "Response Processing",
    "Chat Completion APIs",
  ],
  "Prompt Engineering": [
    "Effective Prompt Design",
    "Context Optimization",
    "Response Quality Enhancement",
    "System Message Configuration",
  ],
  "Azure AI": [
    "AI Service Integration",
    "Cognitive Services",
    "Model Deployment",
    "AI Pipeline Development",
  ],
  "AI Integration": [
    "AI Feature Implementation",
    "API Integration Patterns",
    "User Experience Enhancement",
    "Performance Optimization",
  ],
  "Machine Learning": [
    "Basic ML Concepts",
    "Data Preprocessing",
    "Model Selection",
    "Training Fundamentals",
  ],

  // Development Tools
  "Visual Studio Code": [
    "Code Editing And Navigation",
    "Extension Management",
    "Debugging Setup",
    "Git Integration",
    "Customization And Shortcuts",
  ],
  Git: [
    "Version Control",
    "Branch Management",
    "Merge Strategies",
    "Conflict Resolution",
    "Collaborative Workflows",
  ],
  BitBucket: [
    "Repository Management",
    "Pull Request Workflows",
    "Code Review Process",
    "Team Collaboration",
  ],
  Docker: [
    "Containerization Basics",
    "Dockerfile Creation",
    "Image Management",
    "Container Deployment",
  ],
  Vercel: [
    "Deployment Automation",
    "Performance Optimization",
    "Domain Management",
    "Environment Configuration",
  ],
  Trello: [
    "Project Organization",
    "Task Management",
    "Team Collaboration",
    "Workflow Setup",
    "Board Customization",
  ],
} as const;

// ============================================================================
// ANIMATION CONFIGURATIONS - Framer Motion optimizations
// ============================================================================

const animations = {
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  skillCard: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { y: -4, transition: { duration: 0.2 } },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  skillDetails: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  staggerChildren: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
} as const;

// ============================================================================
// MAIN COMPONENT - Modern React with performance optimizations
// ============================================================================

/**
 * About Page Component
 *
 * Features:
 * - Interactive skill showcase with auto-rotation
 * - Advanced multi-dimensional filtering system
 * - Responsive design with smooth animations
 * - Performance-optimized with React.memo and useMemo
 * - TypeScript strict mode compliance
 * - Accessibility-compliant interface
 */
const AboutPage: React.FC = () => {
  // ========================================================================
  // STATE MANAGEMENT - Optimized with proper typing
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
  // RENDER - Modern JSX with accessibility and performance optimizations
  // ========================================================================

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 relative">
      <SectionParticles count={10} />

      <AnimatedReveal className="mb-12">
        <section aria-labelledby="bio-heading" className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center">
            {/* Left: portrait with subtle hover glow */}
            <motion.div
              className="relative w-full max-w-[320px] mx-auto md:mx-0 h-[400px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="group relative w-full h-full">
                <Image
                  src="/images/Linkedin.png"
                  alt="Gabriel Siwa portrait"
                  fill
                  priority
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-cover object-top rounded-xl border-2 border-white/10 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:border-galaxy-accent/30"
                  style={{
                    objectPosition: "center 10%",
                  }}
                />

                {/* Subtle cyan/purple glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-galaxy-accent/20 via-cyan-500/10 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"></div>
              </div>
            </motion.div>

            {/* Right: bio text with better spacing and highlights */}
            <div className="text-left space-y-4">
              <div className="space-y-4">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-galaxy-accent to-galaxy-secondary bg-clip-text text-galaxy-moonbeam"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Hi, I&apos;m Gab!
                </motion.h1>

                <div className="text-md text-galaxy-text-secondary leading-relaxed space-y-4">
                  <p>
                    I&apos;m a backend-leaning software developer who ships
                    secure, reliable, cloud-backed apps and mobile experiences.
                  </p>

                  <p>
                    I work across{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      React
                    </span>{" "}
                    and{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      TypeScript
                    </span>{" "}
                    on the client, and{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      Node.js
                    </span>{" "}
                    and{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      Java
                    </span>{" "}
                    with MongoDB/MSSQL on the server. I care about the
                    intersection of performance, reliability, and developer
                    experience—clear API contracts, predictable releases, and
                    code that&apos;s easy to read and test.
                  </p>

                  <p>
                    My toolbelt includes{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      Azure
                    </span>{" "}
                    for deployments,{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      GitHub Actions
                    </span>{" "}
                    for{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      CI/CD
                    </span>
                    , and pragmatic testing, triage, and documentation to keep
                    teams moving.
                  </p>

                  <p>
                    I&apos;ve delivered measurable improvements in API
                    responsiveness and automated workflows that remove manual
                    steps. I&apos;m comfortable balancing speed with{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      security
                    </span>{" "}
                    practices like strong password hashing and input protection.
                  </p>

                  <p>
                    I collaborate well in Agile teams, give and receive
                    thoughtful code reviews, and learn new tools quickly.{" "}
                    <span className="text-galaxy-text-accent font-medium">
                      I&apos;m always eager to tackle complex problems and
                      create tools that empower users and teams.
                    </span>
                  </p>
                </div>
                {/* Availability Status */}
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-galaxy-text-secondary">
                    Actively seeking full-time software developer opportunities
                  </span>
                </div>
                <div className="flex mx-auto my-auto justify-center">
                  <a
                    href="https://www.linkedin.com/in/gabrielsiwa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-galaxy-plasma text-galaxy-text font-semibold py-2 px-5 rounded-lg shadow-md
               hover:bg-galaxy-plasma/90 hover:shadow-lg hover:-translate-y-0.5 transition
               focus:outline-none focus:ring-2 focus:ring-galaxy-plasma focus:ring-offset-2"
                  >
                    Open to Opportunities
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedReveal>

      <AnimatedReveal>
        {/* Skills Section */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Section Header */}
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

          {/* Advanced Filter Panel */}
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

          {/* Category Navigation */}
          {filteredSkills.type === "category" && (
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
          )}

          {/* Dynamic Status Information */}
          {filteredSkills.type === "category" && (
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
          )}

          {/* Skills Display */}
          {filteredSkills.type === "category" ? (
            /* Category Mode: Normal display with auto-rotation */
            <motion.div
              key={`${activeCategory}-${filters.experience.join(
                ","
              )}-${filters.type.join(",")}-${filters.proficiency.join(",")}`}
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
          ) : (
            /* Filtered Mode: Cross-category results grouped by category */
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
                              ({items.length} skill
                              {items.length !== 1 ? "s" : ""})
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
                                onClick={() =>
                                  handleSkillClick(item.skill.name)
                                }
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
          )}

          {/* Skill Details for Category Mode Only */}
          <AnimatePresence mode="wait">
            {filteredSkills.type === "category" &&
              ((isAutoFlipping &&
                isFlippingSkills &&
                filteredSkills.skills[currentSkillIndex]) ||
                selectedSkill) && (
                <motion.div
                  key={`skill-details-${
                    selectedSkill ||
                    filteredSkills.skills[currentSkillIndex]?.name
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
        </motion.div>
      </AnimatedReveal>
    </main>
  );
};

export default AboutPage;
