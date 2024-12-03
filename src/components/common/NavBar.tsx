
import { motion } from "framer-motion";
const NavBar = () => {
  return (
    <div className=" fixed z-[999] left-0 right-0 flex justify-center items-center top-2">
      <motion.div
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="text-center text-white/70"
      >
        <nav className="flex gap-1 p-0.5 border border-white/30 rounded-full bg-white/10 backdrop-blur">
          <a href="#home" className="nav-item">
            Home
          </a>
          <a href="#about" className="nav-item">
            About
          </a>
          <a href="#skills" className="nav-item">
            Skills
          </a>
          <a href="#projects" className="nav-item">
            Projects
          </a>
          <a href="#contact" className="nav-item">
            Contact
          </a>
        </nav>
      </motion.div>
    </div>
  );
};

export default NavBar;
