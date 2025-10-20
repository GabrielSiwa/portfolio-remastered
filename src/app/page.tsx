import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import ConstellationLayer from "./components/ConstellationLayer";

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
