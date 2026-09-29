import type { ReactNode } from "react";

interface TitleBarProps {
  variant: "window" | "dialog";
  leftBoxes: 1 | 2;
  children: ReactNode;
}

const sizeClass = {
  window: { bar: "h-[34px]", box: "h-[15px] w-[15px]" },
  dialog: { bar: "h-[30px]", box: "h-[13px] w-[13px]" },
};

const TitleBar = ({ variant, leftBoxes, children }: TitleBarProps) => {
  const size = sizeClass[variant];

  return (
    <div
      className={`mac-titlebar-stripes m-1 flex ${size.bar} items-center gap-3 px-[7px]`}
    >
      {Array.from({ length: leftBoxes }, (_, index) => (
        <span
          key={index}
          className={`${size.box} flex-shrink-0 border-2 border-ink bg-paper`}
          aria-hidden="true"
        />
      ))}
      {children}
      <span
        className={`${size.box} flex-shrink-0 border-2 border-ink bg-paper shadow-[inset_3px_3px_#fff,inset_4px_4px_#111]`}
        aria-hidden="true"
      />
    </div>
  );
};

export default TitleBar;
