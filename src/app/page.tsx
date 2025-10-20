import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ConstellationLayer from "./components/ConstellationLayer";
import dynamic from "next/dynamic";

// Lazy load below-fold sections for better LCP performance
const AboutSection = dynamic(() => import("./components/AboutSection"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-galaxy-text-accent">Loading...</div>
    </div>
  ),
});

const ContactSection = dynamic(() => import("./components/ContactSection"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-galaxy-text-accent">Loading...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* ConstellationLayer exclusive to homepage */}
      <ConstellationLayer />

      <section id="hero">
        <Hero />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
