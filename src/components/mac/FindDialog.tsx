import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { searchIndex, type SearchIndexEntry } from "../../data/searchIndex";
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

const RESULT_LIMIT = 30;

const FindDialog = ({ open, onClose }: FindDialogProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle === "") return [];
    return searchIndex.filter((entry) =>
      entry.label.toLowerCase().includes(needle),
    );
  }, [query]);

  const visible = results.slice(0, RESULT_LIMIT);
  const activeOptionIndex = Math.min(
    activeIndex,
    Math.max(visible.length - 1, 0),
  );

  useEffect(() => {
    if (activeIndex >= visible.length) return;
    (
      listRef.current?.children[activeIndex] as HTMLElement | undefined
    )?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, visible]);

  const pendingTarget = useRef<string | null>(null);

  // The dialog restores focus to its opener when it closes, so the landing
  // element can only take focus once that teardown has run.
  useEffect(() => {
    if (open) return;
    const target = pendingTarget.current;
    if (target === null) return;
    pendingTarget.current = null;
    document.getElementById(target)?.focus({ preventScroll: true });
  }, [open]);

  const handleClose = () => {
    setQuery("");
    setActiveIndex(0);
    onClose();
  };

  const handleSelect = (entry: SearchIndexEntry) => {
    pendingTarget.current = entry.target;
    handleClose();
    document.getElementById(entry.target)?.scrollIntoView();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (visible.length === 0) return;
    const clamped = Math.min(activeIndex, visible.length - 1);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(Math.min(clamped + 1, visible.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(Math.max(clamped - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSelect(visible[clamped]);
    }
  };

  const trimmed = query.trim();
  const status =
    trimmed === ""
      ? ""
      : results.length === 0
        ? `No results for “${query}”`
        : results.length > RESULT_LIMIT
          ? `Showing first ${RESULT_LIMIT} of ${results.length} results`
          : `${results.length} results`;

  return (
    <MacDialog
      title="Find"
      open={open}
      onClose={handleClose}
      footer={<SquareButton onClick={handleClose}>Close</SquareButton>}
    >
      <input
        type="search"
        name="search"
        autoComplete="off"
        spellCheck={false}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search skills, projects, experience…"
        aria-label="Search"
        role="combobox"
        aria-expanded={visible.length > 0}
        aria-controls="find-results"
        aria-autocomplete="list"
        aria-activedescendant={
          visible.length > 0 ? `find-option-${activeOptionIndex}` : undefined
        }
        className="w-full border border-ink bg-paper px-2.5 py-2 text-11 placeholder:text-muted"
      />
      <p role="status" className="sr-only">
        {status}
      </p>
      <div
        ref={listRef}
        id="find-results"
        role="listbox"
        aria-label="Search results"
        className="mac-scroll mt-3 max-h-[280px] overflow-y-auto"
      >
        {trimmed === "" ? (
          <p className="px-2.5 py-2 text-11 text-muted">
            Type to search. ↑↓ to move, Enter to open, Esc to close.
          </p>
        ) : results.length === 0 ? (
          <p className="px-2.5 py-2 text-11 text-muted">
            No results found for &quot;{query}&quot;
          </p>
        ) : (
          visible.map((entry, index) => (
            <div
              key={`${entry.label}-${index}`}
              role="option"
              id={`find-option-${index}`}
              aria-selected={index === activeIndex}
              onClick={() => handleSelect(entry)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group flex w-full cursor-pointer justify-between gap-3 border-t border-chrome px-2.5 py-[7px] text-left text-11 first:border-t-0 ${
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
            </div>
          ))
        )}
      </div>
    </MacDialog>
  );
};

export default FindDialog;
