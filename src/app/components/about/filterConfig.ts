/**
 * Filter Configuration
 * Advanced multi-dimensional filtering system
 * Supports experience level, technology type, and proficiency filtering
 */

export const filterConfiguration = {
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
        "Bootstrap",
        "Framer Motion",
      ] as const,
    },
    {
      label: "Databases",
      value: "databases",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Prisma", "Mongoose"] as const,
    },
    {
      label: "Cloud & DevOps",
      value: "cloud",
      skills: [
        "Azure Cloud",
        "AWS",
        "Google Cloud",
        "Docker",
        "Vercel",
      ] as const,
    },
    {
      label: "Tools",
      value: "tools",
      skills: [
        "Visual Studio Code",
        "Git",
        "Android Studio",
        "BitBucket",
        "Trello",
        "npm",
        "Yarn",
        "Postman",
      ] as const,
    },
    {
      label: "Operating Systems",
      value: "os",
      skills: ["Windows", "Ubuntu", "Linux", "macOS"] as const,
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
    {
      label: "UI & Styling",
      value: "ui",
      skills: ["Tailwind CSS", "ShadCN UI", "Next UI", "HTML", "CSS"] as const,
    },
    {
      label: "Authentication & Security",
      value: "security",
      skills: ["NextAuth", "Argon2"] as const,
    },
  ],
  proficiency: [
    { label: "Beginner", value: "beginner", range: [1, 1] },
    { label: "Intermediate", value: "intermediate", range: [2, 3] },
    { label: "Advanced", value: "advanced", range: [4, 10] },
  ],
} as const;
