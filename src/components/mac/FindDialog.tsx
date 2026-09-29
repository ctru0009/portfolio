import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { searchIndex, type SearchIndexEntry } from "../../data/searchIndex";
import MacDialog from "./MacDialog";
import SquareButton from "./SquareButton";

interface FindDialogProps {
  open: boolean;
  onClose: () => void;
}

interface HighlightStyleRecord {
  element: HTMLElement;
  style: string | null;
}

const sectionLabel: Record<string, string> = {
  home: "Home",
  about: "About",
  skills: "Skills",
  works: "Work",
  projects: "Projects",
  contact: "Contact",
};

const resultSection = (targetId: string) => {
  if (targetId.startsWith("skill-")) return "Skills";
  if (targetId.startsWith("project-")) return "Projects";
  return sectionLabel[targetId] ?? targetId;
};

const FindDialog = ({ open, onClose }: FindDialogProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [restoreFocusOnClose, setRestoreFocusOnClose] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedTargetRef = useRef<HTMLElement | null>(null);
  const highlightStylesRef = useRef<HighlightStyleRecord[]>([]);
  const selectionEventRef = useRef<Event | null>(null);

  const clearHighlight = useCallback(() => {
    for (const record of highlightStylesRef.current) {
      if (record.style === null) record.element.removeAttribute("style");
      else record.element.setAttribute("style", record.style);
    }
    highlightStylesRef.current = [];
    selectedTargetRef.current?.blur();
    selectedTargetRef.current = null;
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle === "") return [];
    return searchIndex.filter((entry) =>
      [entry.label, ...(entry.keywords ?? [])].some((value) =>
        value.toLowerCase().includes(needle),
      ),
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

  useEffect(() => {
    if (open) {
      setRestoreFocusOnClose(true);
      setSelectedTargetId(null);
      return;
    }

    if (!selectedTargetId) return;
    const target = document.getElementById(selectedTargetId);
    if (!target) return;

    target.setAttribute("tabindex", "-1");
    target.scrollIntoView({ block: "start" });
    target.focus({ preventScroll: true });
    selectedTargetRef.current = target;

    const whiteText = Array.from(
      target.querySelectorAll<HTMLElement>("p, h3, a"),
    );
    const paperElements = Array.from(
      target.querySelectorAll<HTMLElement>(".bg-paper"),
    );
    const highlightedElements = new Set([
      target,
      ...whiteText,
      ...paperElements,
    ]);
    for (const element of highlightedElements) {
      highlightStylesRef.current.push({
        element,
        style: element.getAttribute("style"),
      });
    }
    target.style.setProperty("background-color", "#111", "important");
    target.style.setProperty("color", "#fff", "important");
    target.style.setProperty("outline", "2px solid #111");
    target.style.setProperty("outline-offset", "2px");
    for (const element of whiteText) {
      element.style.setProperty("color", "#fff", "important");
    }
    for (const element of paperElements) {
      element.style.setProperty("background-color", "#fff", "important");
      element.style.setProperty("color", "#111", "important");
    }

    const clear = () => clearHighlight();
    const clearOnKeyDown = (event: KeyboardEvent) => {
      if (event === selectionEventRef.current) {
        selectionEventRef.current = null;
        return;
      }
      clearHighlight();
      window.removeEventListener("keydown", clearOnKeyDown);
    };
    window.addEventListener("pointerdown", clear, { once: true });
    window.addEventListener("keydown", clearOnKeyDown);
    window.addEventListener("touchstart", clear, { once: true });
    window.addEventListener("wheel", clear, { once: true });

    return () => {
      window.removeEventListener("pointerdown", clear);
      window.removeEventListener("keydown", clearOnKeyDown);
      window.removeEventListener("touchstart", clear);
      window.removeEventListener("wheel", clear);
    };
  }, [clearHighlight, open, selectedTargetId]);

  const handleClose = () => {
    setQuery("");
    setActiveIndex(0);
    onClose();
  };

  const handleSelect = (entry: SearchIndexEntry, selectionEvent?: Event) => {
    selectionEventRef.current = selectionEvent ?? null;
    setSelectedTargetId(entry.targetId);
    setRestoreFocusOnClose(false);
    handleClose();
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
      handleSelect(results[clamped], event.nativeEvent);
    }
  };

  return (
    <>
      <MacDialog
        title="Find"
        open={open}
        onClose={handleClose}
        restoreFocusOnClose={restoreFocusOnClose}
        footer={<SquareButton onClick={handleClose}>Close</SquareButton>}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => {
            clearHighlight();
            setQuery(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search skills, projects, experience…"
          aria-label="Search"
          className="w-full border border-ink bg-paper px-2.5 py-2 text-11 placeholder:text-muted"
        />
        <div
          ref={listRef}
          className="mac-scroll mt-3 max-h-[280px] overflow-y-auto"
        >
          {query.trim() === "" ? (
            <p role="status" className="px-2.5 py-2 text-11 text-muted">
              Type to search. ↑↓ Move · Enter Open · Esc Close
            </p>
          ) : results.length === 0 ? (
            <p role="status" className="px-2.5 py-2 text-11 text-muted">
              No results found for &quot;{query}&quot;
            </p>
          ) : (
            results.map((entry, index) => (
              <button
                key={entry.targetId}
                type="button"
                data-target-id={entry.targetId}
                onClick={() => handleSelect(entry)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group flex min-h-[44px] w-full justify-between gap-3 border-t border-chrome px-2.5 py-[7px] text-left text-11 first:border-t-0 ${
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
                  {resultSection(entry.targetId)}
                </span>
              </button>
            ))
          )}
        </div>
      </MacDialog>
    </>
  );
};

export default FindDialog;
