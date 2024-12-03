import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface ContactItemProps {
  item: {
    icon: ReactNode;
    label: string;
    value: string;
    link?: string;
  };
  index: number;
}

const ContactItem: FC<ContactItemProps> = ({ item, index }) => (
  <motion.div
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
);

export default ContactItem;
