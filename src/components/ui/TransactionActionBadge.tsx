// src/components/TransactionActionBadge.tsx
"use client";

import { TransactionAction } from "@/lib/types";

interface BadgeProps {
  action: TransactionAction;
  className?: string;
}

export default function TransactionActionBadge({
  action,
  className = "",
}: BadgeProps) {
  const styles: Record<TransactionAction, string> = {
    OPENING:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    BUY: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    SELL: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    DIVIDEND: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    SPLIT:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    CASH_DIV: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[action]} ${className}`}
    >
      {action}
    </span>
  );
}
