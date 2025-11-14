// app/page.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import UserMenu from "@/components/UserMenu";
import HoldingsView from "@/components/HoldingsView";
import TransactionsView from "@/components/TransactionsView";
import AddTransactionModal from "@/components/AddTransactionModal";
import Select from "@/components/ui/Select";
import { Currency } from "@/lib/types";

type ViewMode = "Holdings" | "Transactions";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("Holdings");
  const [currency, setCurrency] = useState<Currency>("TWD");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const viewModeOptions = [
    { value: "Holdings", label: "Holdings" },
    { value: "Transactions", label: "Transactions" },
  ];

  const currencyOptions = [
    { value: "TWD", label: "TWD" },
    { value: "USD", label: "USD" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-start py-8 md:py-12 px-8 sm:px-12 md:px-16 bg-white dark:bg-zinc-950">
        {/* Header Section */}
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-2">
            {/* Switch View Mode */}
            <Select
              value={viewMode}
              onChange={(value) => setViewMode(value as ViewMode)}
              options={viewModeOptions}
            />

            {/* Add Transaction Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 border border-amber-500 dark:border-amber-500/70 bg-white dark:bg-zinc-950 text-amber-500 dark:text-amber-500/70 hover:bg-amber-500/10 text-sm font-medium rounded-md transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>

          <div className="flex gap-2">
            <Select
              value={currency}
              onChange={(value) => setCurrency(value as Currency)}
              options={currencyOptions}
              variant="underline"
            />

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>

        {/* Content */}
        {viewMode === "Holdings" ? <HoldingsView /> : <TransactionsView />}

        {/* Add Transaction Modal */}
        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </main>
    </div>
  );
}
