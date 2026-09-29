import type { ReactNode } from "react";
import { squareBaseClass, squareVariantClass } from "./squareClass";

interface SquareLinkProps {
  variant?: "light" | "dark";
  href: string;
  className?: string;
  children: ReactNode;
}

const SquareLink = ({
  variant = "light",
  href,
  className = "",
  children,
}: SquareLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${squareBaseClass} ${squareVariantClass[variant]} ${className}`.trim()}
    >
      {children}
    </a>
  );
};

export default SquareLink;
