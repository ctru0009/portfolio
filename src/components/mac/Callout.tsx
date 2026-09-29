import type { ReactNode } from "react";

interface CalloutProps {
  tone?: "default" | "success" | "warning";
  children: ReactNode;
}

const toneClass = {
  default: "border border-ink bg-chrome px-3 py-2.5 shadow-hard-callout",
  success: "border-2 border-ink bg-ink px-3 py-2.5 text-paper",
  warning: "border-t border-dashed border-[#777] pt-3",
};

const Callout = ({ tone = "default", children }: CalloutProps) => {
  return (
    <div
      role={tone === "warning" ? "alert" : undefined}
      className={`text-[11px] leading-[1.6] ${toneClass[tone]}`}
    >
      {children}
    </div>
  );
};

export default Callout;
