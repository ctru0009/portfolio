import type { ReactNode } from "react";

interface FactRowProps {
  label: string;
  layout?: "row" | "stacked";
  children: ReactNode;
}

const FactRow = ({ label, layout = "row", children }: FactRowProps) => {
  if (layout === "stacked") {
    return (
      <div className="text-[10px] leading-[2.4]">
        <div>{label}</div>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-2.5 text-[10px] leading-[2.4]">
      <span>{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
};

export default FactRow;
