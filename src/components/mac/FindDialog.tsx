import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { searchIndex } from "../../data/searchIndex";
import MacDialog from "./MacDialog";
import SquareButton from "./SquareButton";

interface FindDialogProps {
  open: boolean;
  onClose: () => void;
}

const sectionLabel: Record<string, string> = {
  skills: "Skills",
  works: "Work",
  projects: "Projects",
};

const FindDialog = ({ open, onClose }: FindDialogProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle === "") return searchIndex;
    return searchIndex.filter((entry) =>
      entry.label.toLowerCase().includes(needle),
    );
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (activeIndex >= results.length) return;
    (
      listRef.current?.children[activeIndex] as HTMLElement | undefined
    )?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results]);

  const handleClose = () => {
    setQuery("");
    setActiveIndex(0);
    onClose();
  };

  const handleSelect = (section: string) => {
    handleClose();
    document.getElementById(section)?.scrollIntoView();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    const clamped = Math.min(activeIndex, results.length - 1);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(Math.min(clamped + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(Math.max(clamped - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSelect(results[clamped].section);
    }
  };

  return (
    <MacDialog
      title="Find"
      open={open}
      onClose={handleClose}
      footer={<SquareButton onClick={handleClose}>Close</SquareButton>}
    >
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search skills, projects, experience…"
        aria-label="Search"
        className="w-full border border-ink bg-paper px-2.5 py-2 text-[11px] placeholder:text-muted"
      />
      <div
        ref={listRef}
        className="mac-scroll mt-3 max-h-[280px] overflow-y-auto"
      >
        {results.length === 0 ? (
          <p className="px-2.5 py-2 text-[11px] text-muted">
            No results found for &quot;{query}&quot;
          </p>
        ) : (
          results.map((entry, index) => (
            <button
              key={`${entry.label}-${index}`}
              type="button"
              onClick={() => handleSelect(entry.section)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group flex w-full justify-between gap-3 border-t border-chrome px-2.5 py-[7px] text-left text-[11px] first:border-t-0 ${
                index === activeIndex
                  ? "bg-ink text-paper"
                  : "hover:bg-ink hover:text-paper"
              }`}
            >
              <span>{entry.label}</span>
              <span
                className={
                  index === activeIndex
                    ? "text-paper"
                    : "text-muted group-hover:text-paper"
                }
              >
                {sectionLabel[entry.section] ?? entry.section}
              </span>
            </button>
          ))
        )}
      </div>
    </MacDialog>
  );
};

export default FindDialog;
