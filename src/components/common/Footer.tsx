import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HeroData } from "../../data/data";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-dark py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Copyright */}
          <div className="text-gray-400 text-sm">
            © {currentYear} {HeroData.name}. All rights reserved.
          </div>

          {/* Center - Quick Links */}
          <div className="flex gap-6 text-sm">
            <a href="#home" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Right side - Social Links */}
          <div className="flex gap-4">
            <a
              href={HeroData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href={HeroData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;