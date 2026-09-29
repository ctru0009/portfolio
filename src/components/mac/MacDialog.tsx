import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface MacDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const boxClass = "h-[13px] w-[13px] flex-shrink-0 border-2 border-ink bg-paper";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MacDialog = ({
  title,
  open,
  onClose,
  children,
  footer,
}: MacDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (dialog && !dialog.contains(document.activeElement)) {
      (dialog.querySelector<HTMLElement>(FOCUSABLE) ?? dialog).focus({
        preventScroll: true,
      });
    }
    return () => openerRef.current?.focus({ preventScroll: true });
  }, [open]);

  if (!open) return null;

  return (
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
        className="w-full max-w-[520px] border-2 border-ink bg-paper shadow-hard outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mac-titlebar-stripes m-1 flex h-[30px] items-center gap-3 px-[7px]">
          <span className={boxClass} aria-hidden="true" />
          <span className="mx-auto truncate bg-paper px-3 py-[3px] text-[11px]">
            {title}
          </span>
          <span
            className={`${boxClass} shadow-[inset_3px_3px_#fff,inset_4px_4px_#111]`}
            aria-hidden="true"
          />
        </div>
        <div className="px-3.5 py-3">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 border-t-2 border-ink px-3.5 py-2.5">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MacDialog;
