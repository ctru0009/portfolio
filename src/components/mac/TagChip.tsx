import type { ReactNode } from "react";

interface TagChipProps {
  children: ReactNode;
}

const TagChip = ({ children }: TagChipProps) => {
  return (
    <span className="border border-ink bg-paper px-1.5 py-px text-[10px]">
      {children}
    </span>
  );
};

export default TagChip;
