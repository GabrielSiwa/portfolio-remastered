"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SkillFlip from "../components/SkillFlip";
import AnimatedReveal from "../components/AnimatedReveal";
import SectionParticles from "../components/SectionParticles";

const skills: {
  name: string;
  years: number;
  icon?: string;
}[] = [
  { name: "Java", years: 3, icon: "java" },
  { name: "Python", years: 3, icon: "python" },
  { name: "C#", years: 1, icon: "csharp" },
  { name: "TypeScript", years: 2, icon: "typescript" },
  { name: "React", years: 2, icon: "react" },
  { name: "Next.js", years: 2, icon: "nextjs" },
  { name: "Node.js", years: 2, icon: "nodejs" },
  { name: "Tailwind CSS", years: 2, icon: "tailwindcss" },
  { name: "MongoDB", years: 2, icon: "mongodb" },
  { name: "JavaScript", years: 4, icon: "javascript" },
  { name: "Vercel", years: 1, icon: "vercel" },
  { name: "Azure Cloud", years: 1, icon: "azure" },
  { name: "Github", years: 4, icon: "github" },
  { name: "Azure AI", years: 1, icon: "azure" },
  { name: "React Native", years: 2, icon: "reactnative" },
  { name: "Expo Go", years: 2, icon: "expo" },
];

const AboutPage = () => {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4 relative">
      <SectionParticles count={10} />

      <AnimatedReveal>
        <h1 className="text-3xl font-bold mb-12 text-center">About Me</h1>

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
                    src="/images/profile_2.jpg"
                    alt="Gabriel Siwa portrait"
                    fill
                    priority
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="object-cover object-top rounded-xl border-2 border-white/10 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:border-galaxy-accent/30"
                    style={{
                      objectPosition: "center 10%", // Tighter crop - head + upper chest only
                    }}
                  />

                  {/* Subtle cyan/purple glow on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-galaxy-accent/20 via-cyan-500/10 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"></div>
                </div>
              </motion.div>

              {/* Right: bio text with better spacing and highlights */}
              <div className="text-left space-y-4">
                <div className="text-md text-galaxy-text-secondary leading-relaxed space-y-4">
                  <p>
                    I&apos;m Gabriel, a backend-leaning software developer who
                    ships secure, reliable, cloud-backed apps and mobile
                    experiences.
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
              </div>
            </div>
          </section>
        </AnimatedReveal>
      </AnimatedReveal>

      <AnimatedReveal className="mb-6">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          {/* <p className="text-sm text-galaxy-text-muted mb-6">
            Tech: <span className="text-galaxy-text-accent">TypeScript</span> ·{" "}
            <span className="text-galaxy-text-accent">React</span> ·{" "}
            <span className="text-galaxy-text-accent">Next.js</span> ·{" "}
            <span className="text-galaxy-text-accent">Node.js</span> ·{" "}
            <span className="text-galaxy-text-accent">Tailwind</span> ·{" "}
            <span className="text-galaxy-text-accent">MongoDB</span> ·{" "}
            <span className="text-galaxy-text-accent">React Native</span>
          </p> */}
          <div className="flex flex-wrap gap-4">
            {skills.map((s) => (
              <div
                key={s.name}
                className="transform hover:-translate-y-1 transition"
              >
                <SkillFlip skill={s.name} years={s.years} icon={s.icon} />
              </div>
            ))}
          </div>
        </section>
      </AnimatedReveal>
    </main>
  );
};

export default AboutPage;
