import { useState } from "react";
import { HeroData } from "../../data/data";
import StepTitle from "../mac/StepTitle";
import SquareButton from "../mac/SquareButton";
import SquareLink from "../mac/SquareLink";
import ContactItem from "./ContactItem";

const contactInfo = [
  {
    label: "Email",
    value: HeroData.email,
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
  "border-b border-ink bg-chrome px-2.5 py-2 text-11 font-normal";

const Contact = () => {
  const [copyFeedback, setCopyFeedback] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(HeroData.email);
      setCopyFeedback("Email address copied.");
    } catch {
      setCopyFeedback("Copy failed - use Email me.");
    }
  };

  return (
    <div id="contact" className="px-[25px] py-6 min-[800px]:px-[30px]">
      <StepTitle number={5} label="Contact" />

      <p className="mb-4 text-12">Email is the fastest way to reach me.</p>

      <div
        className="mb-2 flex flex-wrap gap-2"
        role="group"
        aria-label="Contact actions"
      >
        <SquareLink variant="dark" href={`mailto:${HeroData.email}`}>
          Email me
        </SquareLink>
        <SquareButton onClick={handleCopyEmail}>
          Copy email address
        </SquareButton>
        <SquareLink href={HeroData.resume}>View CV</SquareLink>
      </div>

      <p role="status" className="mb-3 min-h-[18px] text-11">
        {copyFeedback}
      </p>

      <div className="border border-ink">
        <h3 className={panelHeadClass}>Direct</h3>
        <div className="flex flex-col gap-1.5 p-2.5">
          {contactInfo.map((item, index) => (
            <ContactItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
