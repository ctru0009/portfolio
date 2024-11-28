import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";
import { HeroData } from "../data/data";

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
      link: null,
    },
  ];

  return (
    <div id="contact" className="section-dark py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-100 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a
            question, or just want to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="text-gray-400">{item.icon}</div>
                  <div>
                    <h3 className="text-gray-300 font-medium">{item.label}</h3>
                    <p className="text-gray-400">{item.value}</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-6 rounded-lg bg-gray-800/50">
                  <div className="text-gray-400">{item.icon}</div>
                  <div>
                    <h3 className="text-gray-300 font-medium">{item.label}</h3>
                    <p className="text-gray-400">{item.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
