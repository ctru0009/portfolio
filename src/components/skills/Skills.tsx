import StepTitle from "../mac/StepTitle";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "cloud" | "also";
}

const skills: Skill[] = [
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "C#", category: "backend" },
  { name: ".NET", category: "backend" },
  { name: "ASP.NET Core", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Fastify", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "SQL", category: "database" },
  { name: "Redis", category: "database" },
  { name: "Prisma", category: "database" },
  { name: "AWS", category: "cloud" },
  { name: "Azure", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "GitHub Actions", category: "cloud" },
  { name: "Azure DevOps", category: "cloud" },
  { name: "Git", category: "also" },
  { name: "AWS Bedrock", category: "also" },
  { name: "Zod", category: "also" },
];

const categoryRows: { label: string; category: Skill["category"] }[] = [
  { label: "Frontend", category: "frontend" },
  { label: "Backend", category: "backend" },
  { label: "Database", category: "database" },
  { label: "Cloud", category: "cloud" },
  { label: "Also", category: "also" },
];

const Skills = () => {
  return (
    <div id="skills" className="px-[25px] py-6 min-[800px]:px-[30px]">
      <StepTitle number={2} label="Skills" />

      <p className="mb-4 max-w-prose text-13">
        Technologies I use in professional work across backend, full-stack,
        cloud and applied AI.
      </p>

      <table className="mac-table">
        <tbody>
          {categoryRows.map((row) => (
            <tr key={row.category}>
              <th scope="row">{row.label}</th>
              <td>
                {skills
                  .filter((skill) => skill.category === row.category)
                  .map((skill) => skill.name)
                  .join(" · ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skills;
