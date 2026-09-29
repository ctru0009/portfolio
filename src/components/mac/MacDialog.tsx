import { useEffect } from "react";
import type { ReactNode } from "react";

interface MacDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const boxClass = "h-[13px] w-[13px] flex-shrink-0 border-2 border-ink bg-paper";

const MacDialog = ({
  title,
  open,
  onClose,
  children,
  footer,
}: MacDialogProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[12vh]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-[520px] border-2 border-ink bg-paper shadow-hard"
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
