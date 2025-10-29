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
    OPENING: "bg-purple-100 text-purple-800",
    BUY: "bg-green-100 text-green-800",
    SELL: "bg-red-100 text-red-800",
    DIVIDEND: "bg-blue-100 text-blue-800",
    SPLIT: "bg-orange-100 text-orange-800",
    CASH_DIV: "bg-teal-100 text-teal-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[action]} ${className}`}
    >
      {action}
    </span>
  );
}
