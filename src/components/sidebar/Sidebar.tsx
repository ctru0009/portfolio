import { AboutData, HeroData, WorkData } from "../../data/data";
import FactRow from "../mac/FactRow";
import { linkClass } from "../mac/linkClass";
import SquareLink from "../mac/SquareLink";

const currentJob = WorkData[0];
const education = AboutData.education[0];

const Sidebar = () => {
  return (
    <aside className="border-b-2 border-ink px-[25px] py-[25px] min-[800px]:border-b-0 min-[800px]:border-r-2 min-[800px]:px-[26px] min-[800px]:py-[32px]">
      <div className="min-[800px]:sticky min-[800px]:top-[48px]">
        <img
          src={HeroData.avatarURL}
          alt="Portrait of Cong Chuong Truong"
          width={140}
          height={140}
          {...({ fetchpriority: "high" } as Record<string, string>)}
          className="float-right mb-3 ml-[15px] h-[55px] w-[55px] border-2 border-ink object-cover min-[800px]:float-none min-[800px]:mb-4 min-[800px]:h-[70px] min-[800px]:w-[70px]"
        />

        <p className="mb-[19px] text-11 uppercase tracking-[1px]">
          {HeroData.title}
        </p>

        <h1 className="mb-[22px] text-balance text-30 font-normal tracking-[-1px] min-[800px]:text-33">
          Hi, I’m {HeroData.name}
        </h1>

        <p className="mb-2.5 text-12">
          Building reliable AI-integrated products.
        </p>
        <div className="mt-[19px] flex flex-wrap gap-x-[25px] gap-y-1 border-t-2 border-ink pt-3 min-[800px]:mt-[31px] min-[800px]:block min-[800px]:pt-[15px]">
          <FactRow label="EXPERIENCE">3+ years</FactRow>
          <FactRow label="CURRENT" layout="stacked">
            {currentJob.title}
            {", "}
            {currentJob.company}
          </FactRow>
          <FactRow label="EDUCATION" layout="stacked">
            {education.degree}
            {", "}
            {education.school}
            {", "}
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
            View CV
          </SquareLink>
          <a
            href={`mailto:${HeroData.email}`}
            className={`inline-flex min-h-[44px] items-center break-words text-10 ${linkClass}`}
          >
            …or email me - {HeroData.email}
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
