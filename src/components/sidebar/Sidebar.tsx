import { AboutData, HeroData, WorkData } from "../../data/data";
import FactRow from "../mac/FactRow";
import SquareButton from "../mac/SquareButton";

const currentJob = WorkData[0];
const education = AboutData.education[0];

const linkClass =
  "underline underline-offset-[3px] hover:bg-ink hover:text-paper hover:decoration-paper";

const Sidebar = () => {
  return (
    <aside className="border-b-2 border-ink px-[25px] py-[25px] min-[800px]:border-b-0 min-[800px]:border-r-2 min-[800px]:px-[26px] min-[800px]:py-[32px]">
      <div className="min-[800px]:sticky min-[800px]:top-[48px]">
        <img
          src={HeroData.avatarURL}
          alt="Profile image"
          className="float-right mb-3 ml-[15px] h-[55px] w-[55px] border-2 border-ink object-cover min-[800px]:float-none min-[800px]:mb-4 min-[800px]:h-[70px] min-[800px]:w-[70px]"
        />

        <p className="mb-[19px] text-[11px] uppercase tracking-[1px]">
          {HeroData.title}
        </p>

        <h1 className="mb-[22px] text-[30px] font-normal leading-[1.16] tracking-[-1px] min-[800px]:text-[33px]">
          Hi, I'm {HeroData.name}
        </h1>

        <p className="mb-2.5 text-[12px] leading-[1.8]">
          Building reliable AI-integrated products.
        </p>
        <p className="text-[11px] leading-[1.8] text-muted">
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
          <SquareButton variant="dark" href={HeroData.resume}>
            Download CV
          </SquareButton>
          <a
            href={`mailto:${HeroData.email}`}
            className={`break-words text-[10px] leading-[1.6] ${linkClass}`}
          >
            …or email me — {HeroData.email}
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
