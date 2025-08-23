import React from "react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-galaxy-text-muted mb-6">
        I&apos;m open to full-time software developer roles. The fastest way to
        reach me is by email.
      </p>

      <div className="space-y-4">
        <a
          href="mailto:gabriel@example.com"
          className="inline-block galaxy-button px-6 py-3 rounded"
        >
          Email me
        </a>

        <Link
          href="/resume.pdf"
          className="inline-block border border-galaxy-border px-6 py-3 rounded text-galaxy-text-accent"
        >
          Download resume
        </Link>
      </div>
    </main>
  );
}
