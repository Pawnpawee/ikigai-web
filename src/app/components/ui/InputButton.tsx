import React from "react";

interface InputButtonProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function InputButton({
  value,
  onChange,
  placeholder = "พิมพ์ข้อความ...",
  className = "",
  style = {},
}: InputButtonProps) {

  const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
  const placeholderLength = [...segmenter.segment(placeholder)].length;
  const valueLength = [...segmenter.segment(value)].length;
  const inputSize = Math.max(valueLength, placeholderLength, 1);

  return (
    <div
      className={`flex py-2 lg:py-4 px-6 lg:px-14 justify-center items-center gap-2.5 pointer-events-auto ${className}`}
      style={{
        borderRadius: "512px",
        border: "4px solid var(--white-radial)",
        background: "var(--white-linear)",
        boxShadow: "0 0 60px -20px var(--color-slate-100)",
        ...style,
      }}
      data-name="InputButton"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="typo-text-h4 text-center bg-transparent border-none outline-none p-0 pointer-events-auto"
        style={{
          width: `${inputSize}ch`,
          minWidth: `${placeholderLength}ch`,
        }}
      />
    </div>
  );
}
