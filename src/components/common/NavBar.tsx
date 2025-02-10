import { useEffect, useState } from "react";
import { NavigationData } from "../../data/data";
import { motion } from "framer-motion";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed z-[999] left-0 right-0 flex justify-center items-center top-6">
      <motion.div
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="text-center text-white/70 relative w-full max-w-screen-xl px-4"
      >
        {/* Burger Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white"
          >
            <div className={`burger-menu ${isOpen ? "open" : ""}`}>
              <span className="block w-6 h-0.5 bg-current mb-1.5 transition-all"></span>
              <span className="block w-6 h-0.5 bg-current mb-1.5 transition-all"></span>
              <span className="block w-6 h-0.5 bg-current transition-all"></span>
            </div>
          </button>
        )}

        {/* Navigation Items */}
        <nav
          className={`
          ${
            isMobile
              ? `absolute top-full left-0 right-0 mt-2 
               ${isOpen ? "flex" : "hidden"} flex-col gap-2 p-4 
               bg-black/80 backdrop-blur rounded-lg`
              : "flex gap-1 p-0.5 border border-white/30 rounded-full bg-white/10 backdrop-blur"
          }
        `}
        >
          {NavigationData.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className={`nav-item ${
                isMobile
                  ? "w-full text-left px-4 py-2 hover:bg-white/10 rounded"
                  : ""
              }`}
              onClick={() => isMobile && setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};

export default NavBar;
