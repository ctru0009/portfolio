import type { MouseEventHandler, ReactNode } from "react";

interface SquareButtonProps {
  variant?: "light" | "dark";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
}

const baseClass = "inline-block border-2 border-ink px-[10px] py-[5px] text-[11px]";

const variantClass = {
  light:
    "bg-paper text-ink shadow-hard-sm hover:bg-ink hover:text-paper active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_#111]",
  dark: "bg-ink text-paper shadow-hard-dark hover:bg-paper hover:text-ink active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0_#777]",
};

const disabledClass =
  "disabled:cursor-not-allowed disabled:bg-paper disabled:text-muted disabled:shadow-none disabled:hover:bg-paper disabled:hover:text-muted";

const SquareButton = ({
  variant = "light",
  href,
  type = "button",
  disabled = false,
  onClick,
  className = "",
  children,
}: SquareButtonProps) => {
  const classes = `${baseClass} ${variantClass[variant]} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${classes} ${disabledClass}`.trim()}
    >
      {children}
    </button>
  );
};

export default SquareButton;
