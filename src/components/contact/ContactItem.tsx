import FactRow from "../mac/FactRow";
import { linkClass } from "../mac/linkClass";

interface ContactItemProps {
  item: {
    label: string;
    value: string;
    link?: string;
  };
}

const ContactItem = ({ item }: ContactItemProps) => {
  return (
    <div className="border border-ink px-2.5 py-1.5">
      <FactRow label={item.label.toUpperCase()}>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {item.value}
          </a>
        ) : (
          item.value
        )}
      </FactRow>
    </div>
  );
};

export default ContactItem;
