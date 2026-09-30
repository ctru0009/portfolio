import { AboutData } from "../../data/data";
import StepTitle from "../mac/StepTitle";

const About = () => {
  const education = AboutData.education[0];

  return (
    <div id="about" className="px-[25px] py-6 min-[800px]:px-[30px]">
      <StepTitle number={4} label="About" />

      <p className="mb-3 max-w-[70ch] text-12">
        I started in full-stack .NET and now build AI-integrated product
        features with the same bar for reliability, privacy and delivery.
      </p>

      <p className="mb-3 max-w-[70ch] text-12">
        AI interprets. Deterministic software acts. I use models where
        interpretation, summarisation or classification creates value, and I
        keep state changes, permissions and workflow transitions in ordinary
        software. Model output is validated, failures degrade safely, and
        high-risk ambiguity stays reviewable.
      </p>

      <p className="mb-4 max-w-[70ch] text-12">
        I use coding agents for investigation, implementation, testing and
        review, and I keep architecture, acceptance criteria and production
        checks human-owned. Outside work I'm usually with friends or playing
        guitar.
      </p>

      <p className="text-11 text-muted">
        Education — {education.degree}, {education.school}, {education.period}
      </p>
    </div>
  );
};

export default About;
