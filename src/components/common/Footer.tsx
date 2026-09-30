import type { ReactNode } from "react";

interface FooterProps {
  statusBar: ReactNode;
}

const Footer = ({ statusBar }: FooterProps) => <footer>{statusBar}</footer>;

export default Footer;
