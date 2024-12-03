import { BiImport } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HeroData } from "../../data/data";

const Hero = () => {
  return (
    <div id="home" className="section-dark scroll-smooth">
      <div className="flex flex-col justify-center items-center h-dvh space-y-12">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <img
            src={HeroData.avatarURL}
            alt="Profile image"
            className="relative w-48 h-48 md:w-56 md:h-56 border-2 rounded-full 
                     border-white/20 hover:border-white/40 
                     transition-all duration-300
                     object-cover filter hover:brightness-110"
          />
        </div>
        <div className="text-center text-white/80 space-y-2 max-w-2xl px-4">
          <h1 className="text-2xl md:text-3xl font-light leading-relaxed">
            Hi there, I'm{" "}
            <span className="font-medium text-white"> {HeroData.name}</span>, I
            am a
            <span className="font-medium text-white"> {HeroData.title} </span>
            based in Melbourne.
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={"mailto:" + HeroData.email} className="hero-button group">
            <span className="flex items-center gap-2">
              Contact me{" "}
              <CiMail className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a href={HeroData.resume} className="hero-button group">
            <span className="flex items-center gap-2">
              Download CV{" "}
              <BiImport className="group-hover:translate-y-[-2px] transition-transform" />
            </span>
          </a>
          <div className="flex gap-3">
            <a
              href={HeroData.linkedin}
              className="hero-button hover:text-white/90 transition-colors"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href={HeroData.github}
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
