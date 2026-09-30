import { AboutData, HeroData, WorkData } from "../../data/data";
import FactRow from "../mac/FactRow";
import SquareLink from "../mac/SquareLink";

const currentJob = WorkData[0];
const education = AboutData.education[0];

const contents = [
  { number: "01", label: "Work", href: "#works" },
  { number: "02", label: "Projects", href: "#projects" },
  { number: "03", label: "Skills", href: "#skills" },
  { number: "04", label: "About", href: "#about" },
  { number: "05", label: "Contact", href: "#contact" },
];

interface SidebarProps {
  activeSection: string;
}

const Sidebar = ({ activeSection }: SidebarProps) => {
  return (
    <aside className="border-b-2 border-ink px-[25px] py-[25px] min-[800px]:border-b-0 min-[800px]:border-r-2 min-[800px]:px-[26px] min-[800px]:py-[32px]">
      <div className="min-[800px]:sticky min-[800px]:top-[48px]">
        <img
          src={HeroData.avatarURL}
          alt="Portrait of Cong Chuong Truong"
          width={280}
          height={280}
          className="float-right mb-3 ml-[15px] h-[55px] w-[55px] border-2 border-ink object-cover min-[800px]:float-none min-[800px]:mb-4 min-[800px]:h-[70px] min-[800px]:w-[70px]"
        />

        <p className="mb-[19px] text-11 uppercase tracking-[1px]">
          {HeroData.title}
        </p>

        <h1 className="mb-[22px] text-30 font-normal tracking-[-1px] min-[800px]:text-33">
          Hi, I'm {HeroData.name}
        </h1>

        <p className="mb-2.5 text-12">
          Building reliable AI-integrated products.
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
        </div>

        <div className="mt-5 flex flex-col items-start gap-2 border border-ink bg-chrome p-3">
          <SquareLink variant="dark" href={HeroData.resume}>
            View CV
          </SquareLink>

          <nav aria-labelledby="sidebar-contents-heading" className="w-full">
            <h2
              id="sidebar-contents-heading"
              className="text-11 font-normal text-muted"
            >
              Contents
            </h2>

            <ul className="mt-1">
              {contents.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center px-1.5 py-1 text-11 max-[800px]:min-h-[44px] ${
                        isActive
                          ? "bg-ink text-paper"
                          : "hover:bg-ink hover:text-paper"
                      }`}
                    >
                      {`${item.number} ${item.label}`}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
