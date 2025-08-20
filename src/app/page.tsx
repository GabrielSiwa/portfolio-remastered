import Hero from "./components/Hero";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import Projects from "./projects/page";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* <AboutPage />
      <Projects />
      <ContactPage /> */}
    </main>
  );
}
