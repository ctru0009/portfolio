import { FaGithub, FaLinkedin } from "react-icons/fa";
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
  ];

  return (
    <div id="contact" className="section-dark py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-100 mb-4">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Open to full-time software engineering roles across Australia,
            including applied AI, backend and full-stack work. Based in
            Melbourne.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 p-8 break-all lg:break-normal"
            >
              <h3 className="text-xl font-medium text-white mb-8">
                Contact Information
              </h3>
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
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 p-8"
            >
              <h3 className="text-xl font-medium text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Happy to talk about software engineering roles, applied AI
                products and production backend problems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-white/5"
                  role="status"
                >
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  Open to full-time roles
                </span>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-white/5"
                  role="status"
                >
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  Based in Melbourne
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
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h3 className="text-2xl font-medium text-white mb-4">
              <span className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Let's work together
              </span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              If you're hiring for a software engineering role — applied AI,
              backend or full-stack — get in touch.
            </p>
            <div
              className="flex flex-wrap justify-center gap-4"
              role="group"
              aria-label="Social media links"
            >
              <a
                href={HeroData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10"
                aria-label="Connect with me on LinkedIn"
              >
                <FaLinkedin aria-hidden="true" />
                Connect on LinkedIn
              </a>
              <a
                href={HeroData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10"
                aria-label="View my GitHub profile"
              >
                <FaGithub aria-hidden="true" />
                Check out my GitHub
              </a>
              <a
                href={HeroData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="View my resume"
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
