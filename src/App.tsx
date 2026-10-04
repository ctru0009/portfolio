import { useEffect, useRef, useState } from "react";
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
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Top band: a section owns the nav once it crosses the header offset. The
  // band is ~10% of the viewport (90px at 900px tall) versus the old 100px
  // line, so the switch point tracks the design instead of a magic constant.
  useEffect(() => {
    const sectionIds = sections.filter((id) => id !== "home");
    const rootMargin =
      window.innerHeight >= 640 ? "-56px 0px -90% 0px" : "-56px 0px -85% 0px";
    const intersecting = new Map<string, boolean>();
    let sentinelRatio = 0;

    const update = () => {
      if (sentinelRatio >= 0.9) {
        setActiveSection("contact"); // clamped at the document bottom
        return;
      }
      let current = "home";
      for (const id of sectionIds) if (intersecting.get(id)) current = id;
      setActiveSection(current);
    };

    const band = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          intersecting.set(entry.target.id, entry.isIntersecting);
        update();
      },
      { rootMargin },
    );
    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) band.observe(element);
    }

    const sentinel = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        sentinelRatio = entry.intersectionRatio;
        update();
      },
      { threshold: 0.9 },
    );
    if (sentinelRef.current) sentinel.observe(sentinelRef.current);

    return () => {
      band.disconnect();
      sentinel.disconnect();
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:border-2 focus:border-ink focus:bg-paper focus:px-2.5 focus:py-1.5 focus:text-11 focus:shadow-hard-sm"
      >
        Skip to content
      </a>
      <MenuBar activeSection={activeSection} />
      <div id="home" className="mx-auto max-w-[1120px] px-4 pt-6 sm:px-6">
        <MacWindow title="congchuongtruong.net - Software Engineer">
          <MetaBar
            left="SOFTWARE ENGINEER - APPLIED AI"
            right="MELBOURNE, AUSTRALIA"
          />
          <div className="grid grid-cols-1 min-[800px]:grid-cols-[310px_1fr]">
            <Sidebar />
            <main id="main-content" tabIndex={-1} className="min-w-0">
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
                right="React, Vite, GitHub Pages - no trackers"
              />
            }
          />
        </MacWindow>
        <div ref={sentinelRef} aria-hidden="true" className="h-6" />
      </div>
    </div>
  );
}

export default App;
