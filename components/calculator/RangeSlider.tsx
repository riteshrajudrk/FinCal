"use client";

type RangeSliderProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  description: string;
};

export function RangeSlider({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  description,
}: RangeSliderProps) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-white/80 p-5 shadow-[0_12px_30px_rgba(16,35,63,0.06)] backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label className="text-sm font-semibold text-[var(--primary-blue-strong)]" htmlFor={id}>
            {label}
          </label>
          <p id={`${id}-description`} className="mt-1 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
        <output
          htmlFor={id}
          className="rounded-full bg-[rgba(34,76,135,0.1)] px-3 py-2 text-sm font-semibold text-[var(--primary-blue)]"
        >
          {formatValue(value)}
        </output>
      </div>
      <input
        id={id}
        aria-describedby={`${id}-description`}
        aria-label={label}
        className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
