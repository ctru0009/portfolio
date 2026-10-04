interface StatusBarProps {
  left: string;
  right: string;
}

const StatusBar = ({ left, right }: StatusBarProps) => {
  return (
    <div className="flex justify-between gap-2.5 border-t-2 border-ink bg-chrome px-3 py-[9px] text-10 min-[800px]:px-[17px] min-[800px]:text-11">
      <span>
        <span aria-hidden="true" className="mr-2">
          ■
        </span>
        {left}
      </span>
      <span>{right}</span>
    </div>
  );
};

export default StatusBar;
