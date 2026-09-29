import { HeroData } from "../../data/data";
import { linkClass } from "../mac/linkClass";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 pb-3 pt-[21px] text-11 min-[800px]:flex-row min-[800px]:justify-between min-[800px]:gap-4">
      <div className="flex flex-wrap gap-4">
        <a
          href={HeroData.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} inline-flex min-h-[44px] items-center`}
        >
          GitHub
        </a>
        <a
          href={HeroData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} inline-flex min-h-[44px] items-center`}
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${HeroData.email}`}
          className={`${linkClass} inline-flex min-h-[44px] items-center`}
        >
          Email
        </a>
      </div>
      <span>{HeroData.location}</span>
    </footer>
  );
};

export default Footer;
