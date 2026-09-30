import type { ReactNode } from "react";
import TitleBar from "./TitleBar";

interface MacWindowProps {
  title: string;
  children: ReactNode;
}

interface MetaBarProps {
  left: string;
  right: string;
}

export const MacWindow = ({ title, children }: MacWindowProps) => {
  const [shortTitle] = title.split(" — ");

  return (
    <div className="border-2 border-ink bg-paper shadow-hard">
      <TitleBar variant="window" leftBoxes={2}>
        <span className="mx-auto hidden truncate bg-paper px-3 py-[3px] text-11 min-[800px]:inline">
          {title}
        </span>
        <span className="mx-auto whitespace-nowrap bg-paper px-3 py-[3px] text-11 min-[800px]:hidden">
          {shortTitle}
        </span>
      </TitleBar>
      {children}
    </div>
  );
};

export const MetaBar = ({ left, right }: MetaBarProps) => {
  return (
    <section
      aria-label="Role and location"
      className="flex justify-between gap-[15px] border-y-2 border-ink bg-chrome px-3 py-[9px] text-10 tracking-[1px] min-[800px]:gap-3 min-[800px]:px-[19px] min-[800px]:text-11"
    >
      <span>{left}</span>
      <span>{right}</span>
    </section>
  );
};
