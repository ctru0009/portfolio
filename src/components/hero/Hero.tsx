import { BiImport } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HeroData } from "../../data/data";

const Hero = () => {
  return (
    <div
      id="home"
      className="section-dark scroll-smooth relative overflow-hidden"
    >
      {/* Ambient glow effect */}
      <div className="absolute inset-0 ambient-glow pointer-events-none" />

      <div className="relative flex flex-col justify-center items-center h-dvh space-y-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-700"></div>
          <img
            src={HeroData.avatarURL}
            alt="Profile image"
            className="relative w-48 h-48 md:w-56 md:h-56 border-2 rounded-full
                     border-white/10 hover:border-white/20
                     shadow-2xl shadow-black/50
                     transition-all duration-500
                     object-cover filter hover:brightness-110"
          />
        </div>
        <div className="text-center text-white/80 space-y-4 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent font-normal">
              {HeroData.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-normal text-gray-300">
            <span className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent font-medium">
              {HeroData.title}
            </span>
          </p>
          <p className="text-lg md:text-xl font-normal text-gray-400">
            Building reliable AI-integrated products.
          </p>
          <p className="text-base md:text-lg font-normal text-gray-400">
            Open to software engineering opportunities
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={"mailto:" + HeroData.email}
            target="_blank"
            className="hero-button group"
          >
            <span className="flex items-center gap-2">
              Contact me{" "}
              <CiMail className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </a>
          <a
            href={HeroData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button group"
          >
            <span className="flex items-center gap-2">
              Download CV{" "}
              <BiImport className="group-hover:translate-y-[-2px] transition-transform duration-300" />
            </span>
          </a>
          <div className="flex gap-3">
            <a
              href={HeroData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button hover:text-white/90 transition-colors"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href={HeroData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button hover:text-white/90 transition-colors"
            >
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
