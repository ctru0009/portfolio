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

const ContactItem: FC<ContactItemProps> = ({ item, index }) => {
  const content = (
    <>
      <div className="p-3 shrink-0 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-colors duration-300">
        <div className="text-gray-300">{item.icon}</div>
      </div>
      <div className="min-w-0">
        <h3 className="text-sm text-gray-500 uppercase tracking-wide">
          {item.label}
        </h3>
        <p className="text-white font-medium break-words lg:[overflow-wrap:normal]">{item.value}</p>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-white/5 hover:bg-gray-800/50 hover:border-white/10 transition-all duration-300"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-white/5">
          {content}
        </div>
      )}
    </motion.div>
  );
};

export default ContactItem;
