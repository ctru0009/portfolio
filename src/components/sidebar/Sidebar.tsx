import { useEffect, useState } from "react";
import { AboutData, HeroData, WorkData } from "../../data/data";
import FactRow from "../mac/FactRow";
import { linkClass } from "../mac/linkClass";
import SquareLink from "../mac/SquareLink";

const currentJob = WorkData[0];
const education = AboutData.education[0];
const contents = [
  { number: "01", label: "About", target: "about" },
  { number: "02", label: "Skills", target: "skills" },
  { number: "03", label: "Work", target: "works" },
  { number: "04", label: "Projects", target: "projects" },
  { number: "05", label: "Contact", target: "contact" },
];
const activeSectionEvent = "portfolio:active-section-change";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const syncActiveSection = (event: Event) => {
      setActiveSection((event as CustomEvent<string>).detail);
    };
    window.addEventListener(activeSectionEvent, syncActiveSection);
    return () =>
      window.removeEventListener(activeSectionEvent, syncActiveSection);
  }, []);

  return (
    <aside className="border-b-2 border-ink px-[25px] py-[25px] min-[800px]:border-b-0 min-[800px]:border-r-2 min-[800px]:px-[26px] min-[800px]:py-[32px]">
      <div className="min-[800px]:sticky min-[800px]:top-[48px]">
        <nav
          aria-label="Contents"
          className="mb-5 hidden border-b border-ink pb-3 min-[800px]:block"
        >
          <h2 className="mb-1 text-13 font-bold">Contents</h2>
          <ul className="grid grid-cols-2 gap-x-2">
            {contents.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <li key={item.target}>
                  <a
                    href={`#${item.target}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex min-h-[36px] items-center gap-2 px-1 text-11 ${
                      isActive
                        ? "bg-ink text-paper"
                        : "hover:bg-ink hover:text-paper"
                    }`}
                  >
                    <span className="text-10">{item.number}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <img
          src={HeroData.avatarURL}
          alt="Profile image"
          width={140}
          height={152}
          className="float-right mb-3 ml-[15px] h-[55px] w-[55px] border-2 border-ink object-cover min-[800px]:float-none min-[800px]:mb-4 min-[800px]:h-[70px] min-[800px]:w-[70px]"
        />

        <p className="mb-[19px] text-11 uppercase tracking-[1px]">
          {HeroData.title}
        </p>

        <h1 className="mb-[22px] text-30 font-normal tracking-[-1px] min-[800px]:text-33">
          Hi, I'm {HeroData.name}
        </h1>

        <p className="mb-2.5 text-13">
          Building reliable AI-integrated products.
        </p>
        <p className="text-11 text-muted">
          Open to software engineering opportunities
        </p>

        <div className="mt-[19px] flex flex-wrap gap-x-[25px] gap-y-1 border-t-2 border-ink pt-3 min-[800px]:mt-[31px] min-[800px]:block min-[800px]:pt-[15px]">
          <FactRow label="BASE">{HeroData.location}</FactRow>
          <FactRow label="EXPERIENCE">3+ years</FactRow>
          <FactRow label="CURRENT" layout="stacked">
            {currentJob.title}
            {"\u00A0· "}
            {currentJob.company}
          </FactRow>
          <FactRow label="EDUCATION" layout="stacked">
            {education.degree}
            {"\u00A0· "}
            {education.school}
            {"\u00A0· "}
            {education.period}
          </FactRow>
          <FactRow label="LINKS">
            <span className="flex flex-wrap justify-end gap-x-4">
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
            </span>
          </FactRow>
        </div>

        <div className="mt-5 flex flex-col items-start gap-2 border border-ink bg-chrome p-3">
          <SquareLink variant="dark" href={HeroData.resume}>
            Download CV
          </SquareLink>
          <a
            href={`mailto:${HeroData.email}`}
            className={`inline-flex min-h-[44px] items-center break-words text-10 ${linkClass}`}
          >
            …or email me — {HeroData.email}
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
