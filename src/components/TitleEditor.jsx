import { useEffect, useRef } from "react";

export default function TitleEditor({ value, onChange }) {
  const ref = useRef(null);
  useEffect(() => {
    document.title = value ? `${value} — TODO` : "TODO";
  }, [value]);

  return (
    <input
      ref={ref}
      className="w-full bg-transparent text-3xl font-bold outline-none border-0 focus:ring-0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Project title"
    />
  );
}
