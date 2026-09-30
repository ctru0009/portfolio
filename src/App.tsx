import { useEffect, useState } from "react";
import "./App.css";
import About from "./components/about/About";
import Footer from "./components/common/Footer";
import Contact from "./components/contact/Contact";
import { MacWindow, MetaBar } from "./components/mac/MacWindow";
import MenuBar from "./components/mac/MenuBar";
import StatusBar from "./components/mac/StatusBar";
import Projects from "./components/projects/Projects";
import Sidebar from "./components/sidebar/Sidebar";
import Skills from "./components/skills/Skills";
import Work from "./components/works/Work";

const sections = ["home", "works", "projects", "skills", "about", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const position = window.scrollY + 100;
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= position) current = section;
      }

      if (
        window.scrollY >=
        document.documentElement.scrollHeight - window.innerHeight - 1
      ) {
        current = "contact";
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const fragment = window.location.hash.slice(1);
    if (!sections.includes(fragment)) return;
    const scrollToFragment = () =>
      document.getElementById(fragment)?.scrollIntoView();
    // The webfont is first used when React renders, so a swap after mount
    // moves section offsets; land only once the font has loaded so the
    // target's final offset is used.
    document.fonts
      .load('13px "Departure"')
      .then(scrollToFragment)
      .catch(scrollToFragment);
  }, []);

  return (
    <div>
      <MenuBar activeSection={activeSection} />
      <div id="home" className="mx-auto max-w-[1120px] px-4 pb-6 pt-6 sm:px-6">
        <MacWindow title="congchuongtruong.net — Software Engineer">
          <MetaBar
            left="SOFTWARE ENGINEER — APPLIED AI"
            right="MELBOURNE, AUSTRALIA"
          />
          <div className="grid grid-cols-1 min-[800px]:grid-cols-[310px_1fr]">
            <Sidebar activeSection={activeSection} />
            <main className="min-w-0">
              <Work />
              <Projects />
              <Skills />
              <About />
              <Contact />
            </main>
          </div>
          <Footer
            statusBar={
              <StatusBar
                left="2026 · Cong Chuong Truong"
                right="React · Vite · GitHub Pages — no trackers"
              />
            }
          />
        </MacWindow>
      </div>
    </div>
  );
}

export default App;
