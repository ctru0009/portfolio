import { HeroData, AboutData } from "../../data/data";
const About = () => {
  const education = AboutData.education;

  return (
    <div id="about" className="section-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl">
            About Me
          </h2>
          <div className="mt-4 w-16 h-1 bg-white mx-auto"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={HeroData.avatarURL}
              alt="Professional headshot"
              className="w-full h-auto"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-100">
              Hey, I'm {HeroData.name}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I'm a <b>Full Stack .NET Developer</b> who loves building things
              that actually work and make people's lives easier. Coding isn't
              just my job, it's genuinely something I can't get enough of.
              There's something really satisfying about taking an idea, figuring
              out how to break it down, and watching it turn into something
              real. I work mostly with{" "}
              <b>
                C#, ASP.NET Core, PostgreSQL, and JavaScript frameworks like
                React and TypeScript
              </b>{" "}
              to build things that are{" "}
              <b>solid, secure, and don't frustrate users</b>. I'm the kind of
              person who gets excited about diving into tricky problems, whether
              that's{" "}
              <b>
                optimizing API performance, making a UI more responsive, or
                getting Docker containers working smoothly
              </b>
              . I also really enjoy{" "}
              <b>
                working with other people to debug weird issues or rethink how a
                system should work
              </b>
              .
            </p>
            <p className="text-gray-300 leading-relaxed">
              When I'm not coding, I'm usually{" "}
              <b>hanging out with friends or messing around on my guitar</b>.
              I'm always up for learning something new or taking on challenges
              that make me a better developer. If you need someone who actually
              cares about building good software and gets excited about solving
              problems, let's talk.
            </p>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-12">
          <h4 className="text-xl font-semibold text-gray-100 mb-6">
            Education
          </h4>
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-lg font-medium text-gray-100">
                    {edu.degree}
                  </h5>
                  <p className="text-gray-400">{edu.school}</p>
                </div>
                <span className="text-gray-400 text-sm">{edu.period}</span>
              </div>

              <div>
                <h6 className="text-gray-300 font-medium mb-2">
                  Relevant Coursework
                </h6>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, courseIndex) => (
                    <span
                      key={courseIndex}
                      className="px-3 py-1 text-sm bg-gray-700/50 text-gray-300 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
