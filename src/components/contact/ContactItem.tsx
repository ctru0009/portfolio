import FactRow from "../mac/FactRow";

interface ContactItemProps {
  item: {
    label: string;
    value: string;
    link?: string;
  };
}

const linkClass =
  "underline underline-offset-[3px] hover:bg-ink hover:text-paper hover:decoration-paper";

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
