import { useMemo, useState } from "react";
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

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle === "") return searchIndex;
    return searchIndex.filter((entry) =>
      entry.label.toLowerCase().includes(needle),
    );
  }, [query]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const handleSelect = (section: string) => {
    handleClose();
    document.getElementById(section)?.scrollIntoView();
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
        placeholder="Search skills, projects, experience…"
        autoFocus
        aria-label="Search"
        className="w-full border border-ink bg-paper px-2.5 py-2 text-[11px] placeholder:text-muted"
      />
      <div className="mt-3 max-h-[280px] overflow-y-auto">
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
              className="group flex w-full justify-between gap-3 border-t border-chrome px-2.5 py-[7px] text-left text-[11px] first:border-t-0 hover:bg-ink hover:text-paper"
            >
              <span>{entry.label}</span>
              <span className="text-muted group-hover:text-paper">
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
