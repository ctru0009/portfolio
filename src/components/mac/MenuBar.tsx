import { useEffect, useRef, useState } from "react";
import { HeroData, NavigationData } from "../../data/data";
import FindDialog from "./FindDialog";

const sections = ["home", "about", "skills", "works", "projects", "contact"];

const itemClass =
  "whitespace-nowrap px-1.5 py-[3px] min-[1000px]:px-[9px]";
const itemHoverClass = "hover:bg-ink hover:text-paper";

const MenuBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY + 100;
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= position) current = section;
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const openFind = () => {
    setMenuOpen(false);
    setFindOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div
        ref={barRef}
        className="relative mx-auto flex h-[38px] max-w-[1120px] items-center gap-3 px-[17px] text-[11px] min-[1000px]:gap-[26px] min-[1000px]:px-[26px]"
      >
        <span className="text-[20px] leading-none" aria-hidden="true">
          ⌘
        </span>
        <span className="hidden text-[12px] min-[800px]:inline">
          {HeroData.name}
        </span>
        <span className="text-[12px] min-[800px]:hidden">Cong C. Truong</span>

        <nav
          className="hidden items-center gap-1.5 min-[800px]:flex min-[1000px]:gap-2.5"
          aria-label="Main navigation"
        >
          {NavigationData.map((item) => {
            const isActive = activeSection === item.link.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.link}
                aria-current={isActive ? "true" : undefined}
                className={`${itemClass} ${
                  isActive ? "bg-ink text-paper" : itemHoverClass
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={openFind}
          className={`hidden whitespace-nowrap min-[800px]:block ${itemClass} ${itemHoverClass}`}
        >
          ⌕ Find…
        </button>

        <span className="ml-auto hidden text-[11px] whitespace-nowrap min-[1150px]:inline">
          Melbourne · Open to full-time roles
        </span>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-bar-dropdown"
          className={`ml-auto whitespace-nowrap min-[800px]:hidden ${itemClass} ${itemHoverClass}`}
        >
          ≡ Menu
        </button>

        {menuOpen ? (
          <div
            id="menu-bar-dropdown"
            className="absolute left-[17px] top-full w-[200px] border-2 border-ink bg-paper shadow-hard-callout min-[800px]:hidden"
          >
            {NavigationData.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="block border-t border-chrome px-2.5 py-2 first:border-t-0 hover:bg-ink hover:text-paper"
              >
                {item.name}
              </a>
            ))}
            <button
              type="button"
              onClick={openFind}
              className="block w-full border-t border-chrome px-2.5 py-2 text-left hover:bg-ink hover:text-paper"
            >
              ⌕ Find…
            </button>
          </div>
        ) : null}
      </div>

      <FindDialog open={findOpen} onClose={() => setFindOpen(false)} />
    </header>
  );
};

export default MenuBar;
