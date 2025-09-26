import Hero from "./components/Hero";
import AboutPage from "./about/page";
// import ContactPage from "./contact/page";
import Projects from "./projects/page";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="hero">
        <Hero />
      </section>

      <section id="projects">
        <Projects />
      </section>
      <section id="about">
        <AboutPage />
      </section>
      {/* <section id="contact">
        <ContactPage />
      </section> */}
    </main>
  );
}
