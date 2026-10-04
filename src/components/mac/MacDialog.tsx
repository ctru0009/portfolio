import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import TitleBar from "./TitleBar";

interface MacDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MacDialog = ({
  title,
  open,
  onClose,
  children,
  footer,
  className = "",
}: MacDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (nodes.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialogRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const root = document.getElementById("root");
    root?.setAttribute("inert", "");
    if (dialog && !dialog.contains(document.activeElement)) {
      (dialog.querySelector<HTMLElement>(FOCUSABLE) ?? dialog).focus({
        preventScroll: true,
      });
    }
    return () => {
      // Root must be interactive again before focus can return to the opener.
      root?.removeAttribute("inert");
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    const gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[12vh]"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        // Container is tabIndex={-1}, focused only when it holds no focusable child; the outline is intentionally suppressed.
        className={`w-full max-w-[520px] border-2 border-ink bg-paper shadow-hard outline-none ${className}`}
        onClick={(event) => event.stopPropagation()}
      >
        <TitleBar variant="dialog" leftBoxes={1}>
          <span className="mx-auto truncate bg-paper px-3 py-[3px] text-11">
            {title}
          </span>
        </TitleBar>
        <div className="px-3.5 py-3">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 border-t-2 border-ink px-3.5 py-2.5">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
};

export default MacDialog;
