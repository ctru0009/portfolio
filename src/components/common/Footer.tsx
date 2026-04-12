import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HeroData, NavigationData } from "../../data/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-gray-950/80 backdrop-blur-xl py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left side - Copyright */}
          <div className="text-gray-500 text-sm">
            © {currentYear}{" "}
            <span className="text-gray-400">{HeroData.name}</span>
          </div>

          {/* Center - Quick Links */}
          <div className="flex gap-8 text-sm">
            {NavigationData.map((item) => (
              <a
                href={item.link}
                key={item.name}
                className="text-gray-500 hover:text-white transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right side - Social Links */}
          <div className="flex gap-4">
            <a
              href={HeroData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-white bg-gray-900/50 hover:bg-gray-800/50 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href={HeroData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-white bg-gray-900/50 hover:bg-gray-800/50 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <FaLinkedin className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
