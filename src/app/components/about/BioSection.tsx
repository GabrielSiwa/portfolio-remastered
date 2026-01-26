/**
 * Bio Section Component
 * Displays personal information, portrait, and professional summary
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const BioSection: React.FC = () => {
  return (
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
                I&apos;m a Full Stack Software Developer with 2 years building production systems in{" "}
                <span className="text-galaxy-text-accent font-medium">
                  React, TypeScript, Node.js, and cloud platforms (Azure, AWS)
                </span>
                .
              </p>

              <p>
                At SAIT, I designed and implemented REST API contracts between React frontends and Node.js backends, defining request/response schemas with TypeScript interfaces that prevented runtime errors and cut integration bugs by 40%.
                </p>

                <p>
                Reduced the QA defects by{" "}
                <span className="text-galaxy-text-accent font-medium">47% by implementing test plan and strategy between sprints ensuring quality code</span>. I rebuilt our CI/CD pipelines with{" "}
                <span className="text-galaxy-text-accent font-medium">
                  GitHub Actions and deployed using Azure
                </span>
                , cutting release times from 45 minutes to 5 minutes.
              </p>

              <p>
                I specialize in{" "}
                <span className="text-galaxy-text-accent font-medium">
                  REST API design, database optimization, and secure authentication
                </span>
                . Currently expanding my AWS deployment experience with{" "}
                <span className="text-galaxy-text-accent font-medium">
                  EC2, RDS, and Lambda
                </span>
                .
              </p>

              <p>
                <span className="text-galaxy-moonbeam font-semibold italic">Philosophy:</span> Ship features that work the first time. Write code that&apos;s fast, testable, and maintainable from backend queries to frontend UIs.
              </p>

              {/* Availability Status */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-galaxy-text-secondary">
                    Actively seeking full-time software developer opportunities
                  </span>
                </div>
                
                <div className="flex justify-start">
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
        </div>
      </div>
    </section>
  );
};
