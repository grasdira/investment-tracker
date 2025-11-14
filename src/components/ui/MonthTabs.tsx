// src/components/MonthTabs.tsx
"use client";

type Month =
  | "ALL"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";

interface MonthTab {
  value: Month;
  label: string;
}

interface MonthTabsProps {
  selectedMonth: Month;
  selectedYear: string;
  onChange: (month: Month) => void;
  className?: string;
}

export default function MonthTabs({
  selectedMonth,
  selectedYear,
  onChange,
  className = "",
}: MonthTabsProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-12

  // All months in Dec to Jan order
  const allMonths: MonthTab[] = [
    { value: "12", label: "Dec" },
    { value: "11", label: "Nov" },
    { value: "10", label: "Oct" },
    { value: "09", label: "Sep" },
    { value: "08", label: "Aug" },
    { value: "07", label: "Jul" },
    { value: "06", label: "Jun" },
    { value: "05", label: "May" },
    { value: "04", label: "Apr" },
    { value: "03", label: "Mar" },
    { value: "02", label: "Feb" },
    { value: "01", label: "Jan" },
  ];

  // Filter months based on selected year
  const getAvailableMonths = (): MonthTab[] => {
    const isCurrentYear = parseInt(selectedYear) === currentYear;

    if (!isCurrentYear) {
      // For past years, show all months
      return [{ value: "ALL", label: "All" }, ...allMonths];
    }

    // For current year, only show months up to current month
    const availableMonths = allMonths.filter(
      (month) => parseInt(month.value) <= currentMonth
    );

    return [{ value: "ALL", label: "All" }, ...availableMonths];
  };

  const months = getAvailableMonths();

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="flex gap-1 min-w-max">
        {months.map((month) => (
          <button
            key={month.value}
            onClick={() => onChange(month.value)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors select-none cursor-pointer dark:bg-zinc-900 dark:hover:bg-zinc-800 ${
              selectedMonth === month.value
                ? "bg-amber-500 text-white dark:text-amber-500"
                : "bg-white border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300/80 hover:bg-zinc-100"
            }`}
          >
            {month.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Export the Month type for use in other components
export type { Month };
