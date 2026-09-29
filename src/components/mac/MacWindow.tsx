import type { ReactNode } from "react";

interface MacWindowProps {
  title: string;
  children: ReactNode;
}

interface MetaBarProps {
  left: string;
  right: string;
}

const boxClass = "h-[15px] w-[15px] flex-shrink-0 border-2 border-ink bg-paper";

export const MacWindow = ({ title, children }: MacWindowProps) => {
  const [shortTitle] = title.split(" — ");

  return (
    <div className="border-2 border-ink bg-paper shadow-hard">
      <div className="mac-titlebar-stripes m-1 flex h-[34px] items-center gap-3 px-[7px]">
        <span className={boxClass} aria-hidden="true" />
        <span className={boxClass} aria-hidden="true" />
        <span className="mx-auto hidden truncate bg-paper px-3 py-[3px] text-[11px] min-[800px]:inline">
          {title}
        </span>
        <span className="mx-auto whitespace-nowrap bg-paper px-3 py-[3px] text-[11px] min-[800px]:hidden">
          {shortTitle}
        </span>
        <span
          className={`${boxClass} shadow-[inset_3px_3px_#fff,inset_4px_4px_#111]`}
          aria-hidden="true"
        />
      </div>
      {children}
    </div>
  );
};

export const MetaBar = ({ left, right }: MetaBarProps) => {
  return (
    <div className="flex justify-between gap-[15px] border-y-2 border-ink bg-chrome px-3 py-[9px] text-[10px] min-[800px]:gap-3 min-[800px]:px-[19px] min-[800px]:text-[11px]">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
};
