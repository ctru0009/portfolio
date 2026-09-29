import type { ReactNode } from "react";

interface FactRowProps {
  label: string;
  children: ReactNode;
}

const FactRow = ({ label, children }: FactRowProps) => {
  return (
    <div className="flex justify-between gap-2.5 text-[10px] leading-[2.4]">
      <span>{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
};

export default FactRow;
