interface StepTitleProps {
  number: number;
  label: string;
}

const StepTitle = ({ number, label }: StepTitleProps) => {
  return (
    <h2 className="mb-2.5 flex items-center gap-3 text-[16px] font-normal">
      <span className="inline-grid h-7 w-7 flex-shrink-0 place-items-center bg-ink text-[13px] text-paper">
        {String(number).padStart(2, "0")}
      </span>
      <span>{label}</span>
    </h2>
  );
};

export default StepTitle;
