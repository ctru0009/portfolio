import { HeroData, AboutData } from "../../data/data";
const About = () => {
  const education = AboutData.education;

  return (
    <div
      id="about"
      className="section-light py-20 px-4 sm:px-6 lg:px-8"
    >
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
              src= {HeroData.avatarURL}
              alt="Professional headshot"
              className="w-full h-auto"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-100">
              Hello, I'm {HeroData.name}
            </h3>

            <p className="text-gray-300 leading-relaxed">
              I'm a {HeroData.title} with a passion for creating elegant solutions to
              complex problems.
            </p>

            {/* Skills Section */}
            <div>
              {/* <h4 className="text-xl font-semibold text-gray-100 mb-4">
                Technical Skills
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Next.js",
                  "Tailwind CSS",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div> */}
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* <div>
                <h4 className="font-medium text-gray-100">Location</h4>
                <p className="text-gray-300">[Your Location]</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-100">Experience</h4>
                <p className="text-gray-300">[X] Years</p>
              </div> */}
            </div>
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
