import React from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Fade triggerOnce direction="up" fraction={0.3}>
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
      </Fade>

      <Fade triggerOnce direction="up" delay={100} fraction={0.3}>
        <p className="text-galaxy-text-muted mb-6">
          I&apos;m open to full-time software developer roles. The fastest way
          to reach me is by email.
        </p>
      </Fade>

      <div className="space-y-4">
        <Fade triggerOnce direction="up" delay={200} fraction={0.3}>
          <a
            href="mailto:siwagabrielira@gmail.com"
            className="inline-block galaxy-button px-6 py-3 rounded"
          >
            Email me
          </a>
        </Fade>

        <Fade triggerOnce direction="up" delay={300} fraction={0.3}>
          <Link
            href="/resume.pdf"
            className="inline-block border border-galaxy-border px-6 py-3 rounded text-galaxy-text-accent"
          >
            Download resume
          </Link>
        </Fade>
      </div>
    </main>
  );
}
