"use client";

import React from "react";
import Link from "next/link";
import { BlurReveal, GradientText, MagneticButton, SplitText, StaggerContainer } from "./ui";

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 min-h-[60vh] flex flex-col justify-center">
      <BlurReveal className="mb-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
          <GradientText>
            <SplitText text="LET'S CONNECT" staggerDelay={0.08} />
          </GradientText>
        </h1>
      </BlurReveal>

      <BlurReveal delay={0.5} className="mb-12 text-center">
        <p className="text-xl md:text-2xl text-galaxy-text-muted max-w-xl mx-auto leading-relaxed">
          I&apos;m open to new opportunities and collaborations. The fastest way
          to reach me is by email.
        </p>
      </BlurReveal>

      <StaggerContainer staggerDelay={0.2} initialDelay={0.8} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <MagneticButton strength={0.3}>
          <a
            href="mailto:siwagabrielira@gmail.com"
            className="inline-block galaxy-button px-10 py-5 rounded-full text-lg font-medium button-premium"
          >
            Email me
          </a>
        </MagneticButton>

        <MagneticButton strength={0.25}>
          <Link
            href="/resume.pdf"
            className="inline-block border border-galaxy-border px-10 py-5 rounded-full text-lg font-medium text-galaxy-text-accent hover:bg-galaxy-text-accent/10 transition-all button-premium"
          >
            Download resume
          </Link>
        </MagneticButton>
      </StaggerContainer>
    </main>
  );
}
