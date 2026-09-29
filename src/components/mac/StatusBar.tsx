interface StatusBarProps {
  left: string;
  right: string;
}

const StatusBar = ({ left, right }: StatusBarProps) => {
  return (
    <div className="flex justify-between gap-2.5 border-t-2 border-ink bg-chrome px-3 py-[9px] text-[10px] min-[800px]:px-[17px] min-[800px]:text-[11px]">
      <span className="before:mr-2 before:content-['■']">{left}</span>
      <span>{right}</span>
    </div>
  );
};

export default StatusBar;
