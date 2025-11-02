import { useEffect, useState } from "react";
import { NavigationData } from "../../data/data";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Sections for scroll spy
  const sections = ["home", "about", "skills", "works", "projects", "contact"];

  // Search data
  const searchableContent = {
    skills: ["React", "TypeScript", "JavaScript", "Node.js", "Python", "Flask", "C#", ".NET", "Tailwind CSS", "Git", "PostgreSQL", "MongoDB", "Redis", "SQL", "Docker", "AWS"],
    projects: ["Document Management", "Quiz App", "Event Management App", "Portfolio Website"],
    technologies: ["React", "TypeScript", "JavaScript", "Flask", "ASP.NET", "Angular", "Node.js", "PostgreSQL", "MongoDB"],
    experience: ["Software Engineer", "Jung Talents", "Technical Support", "Monash University"]
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results: string[] = [];
    const lowerQuery = query.toLowerCase();

    Object.entries(searchableContent).forEach(([category, items]) => {
      items.forEach(item => {
        if (item.toLowerCase().includes(lowerQuery)) {
          results.push(`${item} (${category})`);
        }
      });
    });

    setSearchResults(results.slice(0, 5)); // Limit to 5 results
  };

  const handleSearchResultClick = (result: string) => {
    const [, category] = result.split(" (");
    const cleanCategory = category.replace(")", "");

    // Navigate to relevant section based on category
    const sectionMap: { [key: string]: string } = {
      "skills": "#skills",
      "projects": "#projects",
      "technologies": "#projects",
      "experience": "#works"
    };

    const targetSection = sectionMap[cleanCategory] || "#home";
    window.location.href = targetSection;
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Handle keyboard navigation for mobile menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen && isMobile) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && isMobile) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, isMobile]);

  return (
    <>
      <div className="fixed z-[999] left-0 right-0 flex justify-center items-center top-6" onKeyDown={handleKeyDown}>
        <motion.div
          initial={{ y: -150 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-center text-white/70 relative"
        >
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
            title="Search"
          >
            <FaSearch className="text-lg" />
          </button>

          {/* Burger Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          )}

          {/* Navigation Items */}
          <nav
            id="mobile-navigation"
            className={`
            ${
              isMobile
                ? `absolute top-full left-0 right-0 mt-2 min-w-[280px]
                 ${isOpen ? "flex" : "hidden"} flex-col gap-1 p-4
                 bg-black/90 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl`
                : "flex gap-1 p-0.5 border border-white/30 rounded-full bg-white/10 backdrop-blur pl-16"
            }
          `}
            role="navigation"
            aria-label="Main navigation"
          >
            {NavigationData.map((item) => {
              const isActive = activeSection === item.link.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className={`
                    relative px-4 py-3 rounded-lg transition-all duration-300
                    ${isMobile
                      ? "w-full text-left text-white/90 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 bg-transparent"
                      : `hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white/70 hover:text-white`
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                  {/* Active indicator */}
                  {isActive && !isMobile && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-white/20 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </motion.div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search skills, projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchResultClick(result)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0"
                    >
                      <span className="text-white">{result.split(" (")[0]}</span>
                      <span className="text-gray-400 text-sm ml-2">
                        {result.split(" (")[1]?.replace(")", "")}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  <p>No results found for "{searchQuery}"</p>
                  <p className="text-sm mt-2">Try searching for skills, projects, or technologies</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
