import { ReactNode, FC } from "react";

interface SkillItemProps {
  skill: {
    name: string;
    icon: ReactNode;
  };
}

const SkillItem: FC<SkillItemProps> = ({ skill }) => (
  <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2">
    <div className="flex flex-col items-center space-y-4">
      {skill.icon}
      <h3 className="text-gray-100 font-medium text-lg">{skill.name}</h3>
    </div>
  </div>
);

export default SkillItem;
