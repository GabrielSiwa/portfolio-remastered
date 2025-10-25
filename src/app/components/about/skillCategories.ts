/**
 * Skill Categories Configuration
 * Comprehensive skill categorization with experience levels and icon mappings
 * Organized by technical domain for optimal navigation and filtering
 */

import type { Skill } from "./types";

export const skillCategories = {
  frontend: [
    { name: "TypeScript", years: 2, icon: "typescript" },
    { name: "React", years: 2, icon: "react" },
    { name: "Next.js", years: 2, icon: "nextjs" },
    { name: "JavaScript", years: 4, icon: "javascript" },
    { name: "Tailwind CSS", years: 2, icon: "tailwindcss" },
    { name: "HTML", years: 4, icon: "html" },
    { name: "CSS", years: 4, icon: "css" },
    { name: "Bootstrap", years: 2, icon: "bootstrap" },
    { name: "ShadCN UI", years: 1, icon: "shadcnui" },
    { name: "Next UI", years: 1, icon: "nextui" },
    { name: "Framer Motion", years: 1, icon: "framer" },
  ] satisfies readonly Skill[],
  backend: [
    { name: "Java", years: 3, icon: "java" },
    { name: "Python", years: 3, icon: "python" },
    { name: "Node.js", years: 2, icon: "nodejs" },
    { name: "MySQL", years: 3, icon: "mysql" },
    { name: "MongoDB", years: 2, icon: "mongodb" },
    { name: "C#", years: 1, icon: "csharp" },
    { name: "PostgreSQL", years: 2, icon: "postgresql" },
    { name: "Prisma", years: 1, icon: "prisma" },
    { name: "Mongoose", years: 1, icon: "mongoose" },
    { name: "NextAuth", years: 1, icon: "nextauth" },
    { name: "Argon2", years: 1, icon: "argon2" },
  ] satisfies readonly Skill[],
  mobile: [
    { name: "React Native", years: 2, icon: "reactnative" },
    { name: "Expo Go", years: 2, icon: "expo" },
  ] satisfies readonly Skill[],
  cloud: [
    { name: "Azure Cloud", years: 1, icon: "azure" },
    { name: "AWS", years: 1, icon: "aws" },
    { name: "Google Cloud", years: 1, icon: "gcp" },
  ] satisfies readonly Skill[],
  ai: [
    { name: "OpenAI API", years: 1, icon: "openai" },
    { name: "Prompt Engineering", years: 1, icon: "prompt" },
    { name: "Azure AI", years: 1, icon: "azure" },
    { name: "AI Integration", years: 1, icon: "ai" },
    { name: "Machine Learning", years: 1, icon: "ml" },
  ] satisfies readonly Skill[],
  tools: [
    { name: "Visual Studio Code", years: 6, icon: "vscode" },
    { name: "Git", years: 4, icon: "github" },
    { name: "Android Studio", years: 2, icon: "androidstudio" },
    { name: "BitBucket", years: 1, icon: "bitbucket" },
    { name: "Docker", years: 1, icon: "docker" },
    { name: "Vercel", years: 1, icon: "vercel" },
    { name: "Trello", years: 1, icon: "trello" },
    { name: "npm", years: 1, icon: "npm" },
    { name: "Yarn", years: 1, icon: "yarn" },
    { name: "Postman", years: 4, icon: "postman" },
  ] satisfies readonly Skill[],
  os: [
    { name: "Windows", years: 10, icon: "windows" },
    { name: "Ubuntu", years: 2, icon: "ubuntu" },
    { name: "Linux", years: 1, icon: "linux" },
    { name: "macOS", years: 1, icon: "macos" },
  ] satisfies readonly Skill[],
} as const;

/**
 * Visual theme system for skill categories
 * Consistent gradient patterns with accessibility considerations
 */
export const categoryThemes = {
  frontend: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
  backend: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  mobile: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
  cloud: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
  ai: "from-orange-500/20 to-red-500/20 border-orange-500/30",
  tools: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
  os: "from-slate-500/20 to-gray-500/20 border-slate-500/30",
} as const;

/**
 * Human-readable category labels for UI presentation
 */
export const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  cloud: "Cloud & Infrastructure",
  ai: "AI & Machine Learning",
  tools: "Tools & DevOps",
  os: "Operating Systems",
} as const;

export type SkillCategory = keyof typeof skillCategories;
