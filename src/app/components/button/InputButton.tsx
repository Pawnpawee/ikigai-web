interface InputButtonProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  maxLength?: number;
}

export default function InputButton({
  value,
  onChange,
  onKeyDown,
  placeholder = "พิมพ์ข้อความ...",
  className = "",
  style = {},
  maxLength,
}: InputButtonProps) {
  const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
  const placeholderLength = [...segmenter.segment(placeholder)].length;
  const valueLength = [...segmenter.segment(value)].length;
  const inputSize = Math.max(valueLength, placeholderLength, 1);

  return (
    <div
      className={`${className} flex py-2 md:py-4 px-6 md:px-14 justify-center items-center gap-2.5 shadow-[0_0_60px_-20px_var(--tw-shadow-color)] shadow-slate-100 rounded-full select-none`}
      style={{
        border: "4px solid var(--white-radial)",
        background: "var(--white-linear)",
        ...style,
      }}
      data-name="InputButton"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        className="text-center text-black bg-transparent border-none outline-none p-0"
        style={{
          width: `${inputSize}ch`,
          minWidth: `${placeholderLength}ch`,
        }}
      />
    </div>
  );
}
