import { HeroData } from "../../data/data";
import StepTitle from "../mac/StepTitle";
import SquareButton from "../mac/SquareButton";
import TagChip from "../mac/TagChip";
import ContactItem from "./ContactItem";

const contactInfo = [
  {
    label: "Email",
    value: HeroData.email,
    link: "mailto:" + HeroData.email,
  },
  {
    label: "LinkedIn",
    value: "congchuongtruong",
    link: HeroData.linkedin,
  },
  {
    label: "GitHub",
    value: "ctru0009",
    link: HeroData.github,
  },
];

const panelHeadClass =
  "border-b border-ink bg-chrome px-2.5 py-2 text-[11px] font-normal";

const Contact = () => {
  return (
    <div id="contact" className="px-[25px] py-6 min-[800px]:px-[30px]">
      <StepTitle number={5} label="Contact" />

      <p className="mb-4 text-[12px] leading-[1.75]">
        Open to full-time software engineering roles across Australia, including
        applied AI, backend and full-stack work. Based in Melbourne.
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <TagChip>Open to full-time roles</TagChip>
        <TagChip>Based in Melbourne</TagChip>
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="border border-ink">
          <h3 className={panelHeadClass}>Contact Information</h3>
          <div className="flex flex-col gap-1.5 p-2.5">
            {contactInfo.map((item, index) => (
              <ContactItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="border border-ink">
          <h3 className={panelHeadClass}>Let's work together</h3>
          <div className="p-2.5">
            <p className="mb-2.5 text-[11px] leading-[1.7]">
              If you're hiring for a software engineering role — applied AI,
              backend or full-stack — get in touch.
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Social media links"
            >
              <SquareButton href={HeroData.linkedin}>
                Connect on LinkedIn
              </SquareButton>
              <SquareButton href={HeroData.github}>
                Check out my GitHub
              </SquareButton>
              <SquareButton variant="dark" href={HeroData.resume}>
                View Resume
              </SquareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
