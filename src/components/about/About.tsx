import { HeroData, AboutData } from "../../data/data";
import { motion } from "framer-motion";

const About = () => {
  const education = AboutData.education;

  return (
    <div id="about" className="section-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-100">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-white/40 to-white/10 mx-auto rounded-full"></div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
          >
            <img
              src={HeroData.avatarURL}
              alt="Professional headshot"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 to-transparent" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-medium text-white">
              Hey, I'm {HeroData.name}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              I'm a <b className="text-gray-300">Full Stack .NET Developer</b>{" "}
              who genuinely loves building software from the ground up. For me,
              coding isn't just a day job—it's the satisfaction of taking a messy
              problem, breaking it down, and engineering a solution that actually
              works.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I work mostly with{" "}
              <b className="text-gray-300">
                C#, ASP.NET Core, PostgreSQL, React, and TypeScript
              </b>
              . Over the last year or so, I've completely embraced{" "}
              <b className="text-gray-300">AI-assisted development</b>. I use
              tools like <b className="text-gray-300">Claude Code</b> daily as a
              core part of my workflow—not to just copy-paste code, but as an
              always-on pair programmer. It helps me scaffold tests, catch edge
              cases, and automate the tedious boilerplate so I can spend my
              actual brainpower on the hard stuff:{" "}
              <b className="text-gray-300">
                optimizing API performance, fixing weird database bottlenecks,
                and architecting secure systems
              </b>
              .
            </p>
            <p className="text-gray-400 leading-relaxed">
              I'm the type of developer who gets excited about{" "}
              <b className="text-gray-300">
                diving into tricky bugs, getting Docker containers to behave, and
                collaborating with a team to rethink how a feature should work
              </b>
              .
            </p>
            <p className="text-gray-400 leading-relaxed">
              When my editor is closed, I'm usually{" "}
              <b className="text-gray-300">
                hanging out with friends or messing around on my guitar
              </b>
              .
            </p>
            <p className="text-gray-400 leading-relaxed">
              I'm always up for learning something new. If you need someone who
              actually cares about{" "}
              <b className="text-gray-300">
                building resilient software and knows how to use modern AI tools
                to ship it efficiently
              </b>
              , let's talk.
            </p>
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-16"
        >
          <h4 className="text-2xl font-medium text-white mb-8">
            <span className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Education
            </span>
          </h4>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h5 className="text-xl font-medium text-white mb-1">
                      {edu.degree}
                    </h5>
                    <p className="text-gray-400">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-500 tracking-wide uppercase">
                    {edu.period}
                  </span>
                </div>

                <div>
                  <h6 className="text-gray-300 font-medium mb-3">
                    Relevant Coursework
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, courseIndex) => (
                      <span
                        key={courseIndex}
                        className="px-4 py-2 text-sm bg-gray-800/50 text-gray-300 rounded-lg border border-white/5 hover:border-white/10 transition-colors duration-200"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
