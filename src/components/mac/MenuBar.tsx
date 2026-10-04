import { useEffect, useRef, useState } from "react";
import { HeroData, NavigationData } from "../../data/data";
import FindDialog from "./FindDialog";

interface MenuBarProps {
  activeSection: string;
}

const itemClass = "whitespace-nowrap px-1.5 py-[3px]";
const itemHoverClass = "hover:bg-ink hover:text-paper";

const MenuBar = ({ activeSection }: MenuBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

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
        className="relative mx-auto flex h-[44px] max-w-[1120px] items-center gap-4 px-[17px] text-11 min-[800px]:h-[38px] min-[1000px]:px-[26px]"
      >
        <span className="text-20" aria-hidden="true">
          ⌘
        </span>
        <span className="hidden text-12 min-[800px]:inline">
          {HeroData.name}
        </span>
        <span className="text-12 min-[800px]:hidden">Cong C. Truong</span>

        <nav
          className="hidden items-center gap-1.5 min-[800px]:flex"
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

        <span className="ml-auto hidden min-w-0 truncate text-11 min-[1024px]:inline">
          Open to backend/software engineering roles
        </span>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-bar-dropdown"
          className={`ml-auto inline-flex min-h-[44px] items-center whitespace-nowrap min-[800px]:hidden ${itemClass} ${itemHoverClass}`}
        >
          ≡ Menu
        </button>

        {menuOpen ? (
          <div
            id="menu-bar-dropdown"
            className="absolute right-[17px] top-full w-[200px] border-2 border-ink bg-paper shadow-hard-callout min-[800px]:hidden"
          >
            <div className="bg-chrome px-2.5 py-2 text-11">
              Open to backend/software engineering roles
            </div>
            {NavigationData.map((item) => {
              const isActive = activeSection === item.link.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className="flex min-h-[44px] items-center border-t border-chrome px-2.5 hover:bg-ink hover:text-paper"
                >
                  {item.name}
                </a>
              );
            })}
            <button
              type="button"
              onClick={openFind}
              className="flex min-h-[44px] w-full items-center border-t border-chrome px-2.5 text-left hover:bg-ink hover:text-paper"
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
