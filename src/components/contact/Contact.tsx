import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { HeroData } from "../../data/data";
import ContactItem from "./ContactItem";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MdEmail className="text-2xl" />,
      label: "Email",
      value: HeroData.email,
      link: "mailto:" + HeroData.email,
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      label: "LinkedIn",
      value: "congchuongtruong",
      link: HeroData.linkedin,
    },
    {
      icon: <FaGithub className="text-2xl" />,
      label: "GitHub",
      value: HeroData.github,
      link: HeroData.github,
    },
    {
      icon: <MdLocationOn className="text-2xl" />,
      label: "Location",
      value: "Melbourne, Australia",
      link: undefined,
    },
  ];

  return (
    <div id="contact" className="section-dark scroll-smooth">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white">Contact</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a
            question, or just want to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <ContactItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
