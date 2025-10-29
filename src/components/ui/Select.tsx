// src/components/Select.tsx
"use client";

import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  variant?: "default" | "underline";
}

export default function Select({
  value,
  onChange,
  options,
  className = "",
  variant = "default",
}: SelectProps) {
  const baseStyles =
    "appearance-none cursor-pointer text-sm font-medium focus:outline-none";

  const variantStyles = {
    default:
      "px-3 py-1.5 pr-8 rounded-md bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
    underline:
      "p-1.5 bg-white text-amber-500 hover:text-amber-600 underline decoration-dashed underline-offset-4",
  };

  return (
    <div className={`relative select-none ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseStyles} ${variantStyles[variant]}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {variant === "default" && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown className="h-4 w-4 text-zinc-600" />
        </div>
      )}
    </div>
  );
}
