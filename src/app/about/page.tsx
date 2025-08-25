import React from "react";
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
        <h1 className="text-3xl font-bold mb-2 text-center">About Me</h1>
        <p className="text-sm text-galaxy-text-accent text-center mb-4">
          TypeScript · React · Next.js · Node.js · Tailwind · MongoDB · Azure ·
          GitHub
        </p>
      </AnimatedReveal>

      {/* <AnimatedReveal className="mb-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What I do</h2>
          <ul className="list-disc list-inside text-galaxy-text-muted">
            <li>
              Build production-ready web applications using TypeScript + React
            </li>
            <li>
              Design accessible UI with semantic HTML and ARIA best practices
            </li>
            <li>Integrate APIs, serverless functions, and managed databases</li>
            <li>Ship iteratively with CI/CD and strong testing habits</li>
          </ul>
        </section>
      </AnimatedReveal> */}
      {/* 
      <AnimatedReveal className="mb-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-6">
            {/* Software Development Student */}
      {/* <div className="border-l-2 border-galaxy-border pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-medium text-galaxy-text-primary">
                  Software Development Student
                </h3>
                <span className="text-sm text-galaxy-text-accent">
                  January 2025 – August 2025
                </span>
              </div>
              <p className="text-galaxy-text-secondary mb-2">
                Southern Alberta Institute of Technology (SAIT) | Calgary, AB
              </p>
              <ul className="list-disc list-inside text-galaxy-text-muted text-sm space-y-1">
                <li>
                  Developing a web-based Pharmacy Order Tracking System (POTS)
                  for real-time order tracking and online ordering from local
                  compounding centers
                </li>
                <li>
                  Designing and developing a centralized dashboard to automate
                  order management, reduce manual processes, and minimize paper
                  waste
                </li>
                <li>
                  Working with modern technologies including React, Next.js,
                  Node.js, and various databases
                </li>
              </ul>
            </div> */}

      {/* Record Technician */}
      {/* <div className="border-l-2 border-galaxy-border pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-medium text-galaxy-text-primary">
                  Record Technician – Technology & Innovation
                </h3>
                <span className="text-sm text-galaxy-text-accent">
                  September 2024 – December 2024
                </span>
              </div>
              <p className="text-galaxy-text-secondary mb-2">
                Government of Alberta | Calgary, AB
              </p>
              <ul className="list-disc list-inside text-galaxy-text-muted text-sm space-y-1">
                <li>
                  Automated quality control steps using digital tools, reducing
                  manual processing by 40% and increasing task efficiency by 30%
                </li>
                <li>
                  Enhanced document tracking and storage accuracy, contributing
                  to a 25% increase in departmental productivity
                </li>
                <li>
                  Streamlined workflows through technology integration and
                  process optimization
                </li>
              </ul>
            </div> */}

      {/* Back-End Java Developer */}
      {/* <div className="border-l-2 border-galaxy-border pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-medium text-galaxy-text-primary">
                  Back-End Java Developer (Co-op)
                </h3>
                <span className="text-sm text-galaxy-text-accent">
                  July 2022 - August 2022
                </span>
              </div>
              <p className="text-galaxy-text-secondary mb-2">
                Xurpas Inc. | Makati, Philippines
              </p>
              <ul className="list-disc list-inside text-galaxy-text-muted text-sm space-y-1">
                <li>
                  Engineered backend logic and RESTful APIs for a client-facing
                  enterprise system using Java and MSSQL, reducing average
                  response time by 15%
                </li>
                <li>
                  Implemented Argon2 encryption protocols to safeguard sensitive
                  client data, significantly enhancing security compliance
                </li>
                <li>
                  Designed and integrated APIs with a Svelte frontend,
                  strengthening frontend-backend communication and reducing
                  development bottlenecks
                </li>
                <li>
                  Facilitated intern task assignments and coordinated sprint
                  reviews with the project manager, boosting team delivery
                  efficiency by 10%
                </li>
              </ul>
            </div>
          </div>
        </section>
      </AnimatedReveal> */}
      {/* 
      <AnimatedReveal className="mb-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <div className="space-y-4"> */}
      {/* SAIT Diploma */}
      {/* <div className="border-l-2 border-galaxy-border pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-medium text-galaxy-text-primary">
                  Diploma in Software Development
                </h3>
                <span className="text-sm text-galaxy-text-accent">
                  January 2024 – August 2025
                </span>
              </div>
              <p className="text-galaxy-text-secondary">
                Southern Alberta Institute of Technology (SAIT) | Calgary, AB
              </p>
            </div> */}

      {/* Bachelor's Degree */}
      {/* <div className="border-l-2 border-galaxy-border pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-medium text-galaxy-text-primary">
                  Bachelor&apos;s degree in Computer Science
                </h3>
                <span className="text-sm text-galaxy-text-accent">
                  Awarded August 2023
                </span>
              </div>
              <p className="text-galaxy-text-secondary">
                Cavite State University - Carmona | Cavite, Philippines
              </p>
            </div>
          </div>
        </section>
      </AnimatedReveal> */}

      <AnimatedReveal className="mb-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 ">Skills</h2>
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
