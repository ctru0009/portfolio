import { FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { HeroData } from "../../data/data";
import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";

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
      value: "ctru0009",
      link: HeroData.github,
    },
    {
      icon: <FaPhone className="text-2xl" />,
      label: "Phone",
      value: "+61 4XX XXX XXX",
      link: "tel:+614XXXXXXXX",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      label: "Location",
      value: HeroData.location,
      link: "#",
    },
  ];

  return (
    <div id="contact" className="section-dark py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-100 mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            I'm always interested in hearing about new opportunities and exciting projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <ContactItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Let's Connect</h3>
              <p className="text-gray-400 mb-4">
                I'm passionate about building amazing web experiences and am always open to discussing new opportunities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  Available for hire
                </span>
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Open to collaborate
                </span>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* Social Links Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-600/50 p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Let's Build Something Amazing Together</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you have a project in mind, want to discuss potential collaborations, or just want to chat about technology - I'm here and ready to connect!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={HeroData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaLinkedin />
                Connect on LinkedIn
              </a>
              <a
                href={HeroData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <FaGithub />
                Check out my GitHub
              </a>
              <a
                href={HeroData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                View Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
