// src/components/TransactionsView.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  TransactionAction,
  Market,
  SortDirection,
  TransactionSortField,
  Transaction,
} from "@/lib/types";
import Select from "./ui/Select";
import MonthTabs, { Month } from "./ui/MonthTabs";
import TransactionActionBadge from "./ui/TransactionActionBadge";
import { filterTransactions, sortTransactions } from "@/lib/utils/transactions";
import { mockTransactions } from "@/lib/mockData";

type SortField = TransactionSortField;

export default function TransactionsView() {
  // data state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // sort state
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // filter state
  const [market, setMarket] = useState<Market | "ALL">("ALL");
  const [transactionAction, setTransactionAction] = useState<
    TransactionAction | "ALL"
  >("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedMonth, setSelectedMonth] = useState<Month>("ALL");

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i); // todo - from transactions

  const marketOptions = [
    { value: "ALL", label: "All Markets" },
    { value: "TW", label: "TW" },
    { value: "US", label: "US" },
  ];

  const actionOptions = [
    { value: "ALL", label: "All Actions" },
    { value: "OPENING", label: "OPENING" },
    { value: "BUY", label: "BUY" },
    { value: "SELL", label: "SELL" },
    { value: "DIVIDEND", label: "DIVIDEND" },
    { value: "SPLIT", label: "SPLIT" },
    { value: "CASH_DIV", label: "CASH_DIV" },
  ];

  const yearSelectOptions = yearOptions.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="inline w-4 h-4 text-amber-500" />
    ) : (
      <ChevronDown className="inline w-4 h-4 text-amber-500" />
    );
  };

  // Fetch transactions on mount
  useEffect(() => {
    loadTransacionData();
  }, []);

  // filter and sort data
  const filteredTransactions = useMemo(() => {
    if (transactions.length === 0) return [];

    const result = filterTransactions(transactions, {
      market,
      action: transactionAction,
      year: selectedYear,
      month: selectedMonth,
    });

    return sortTransactions(result, sortField, sortDirection);
  }, [
    transactions,
    market,
    transactionAction,
    selectedYear,
    selectedMonth,
    sortField,
    sortDirection,
  ]);

  const loadTransacionData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = mockTransactions;
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load transactions"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-zinc-600">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={loadTransacionData}
          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col items-start gap-3 w-full py-4 border-b border-zinc-200">
        <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Transaction History
        </h1>

        {/* Summary Stats */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-zinc-600 dark:text-zinc-400 text-xs">
              Cash Invested
            </div>
            <div className="text-xl font-bold text-black dark:text-zinc-50">
              652,090
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-zinc-600 dark:text-zinc-400 text-xs">
              Cash Dividends
            </div>
            <div className="text-xl font-bold text-green-600">+12,500</div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-zinc-600 dark:text-zinc-400 text-xs">
              Total Realized P&L
            </div>
            <div className="text-xl font-bold text-green-600">+35,410</div>
          </div>
        </div>

        <div className="text-zinc-400 text-xs">{`last updated at ${new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        )}`}</div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4 py-4 w-full">
        <div className="flex gap-2 flex-wrap">
          {/* Market Select */}
          <Select
            value={market}
            onChange={(value) => setMarket(value as Market)}
            options={marketOptions}
          />

          {/* Action Select */}
          <Select
            value={transactionAction}
            onChange={(value) =>
              setTransactionAction(value as TransactionAction | "ALL")
            }
            options={actionOptions}
          />

          {/* Year Select */}
          <Select
            value={selectedYear}
            onChange={(value) => {
              setSelectedYear(value);
              setSelectedMonth("ALL");
            }}
            options={yearSelectOptions}
          />
        </div>

        {/* Month Tabs */}
        <MonthTabs
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onChange={setSelectedMonth}
        />

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 select-none">
                <th
                  className={`py-3 px-4 text-left text-sm font-semibold ${
                    sortField === "date"
                      ? "text-amber-500"
                      : "text-zinc-700 hover:text-zinc-900"
                  } cursor-pointer`}
                  onClick={() => handleSort("date")}
                >
                  Date {renderSortIndicator("date")}
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`${
                        sortField === "code"
                          ? "text-amber-500"
                          : "text-zinc-700 hover:text-zinc-900"
                      } cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSort("code");
                      }}
                    >
                      Code {renderSortIndicator("code")}
                    </span>
                    <span
                      className={`${
                        sortField === "transactionAction"
                          ? "text-amber-500"
                          : "text-zinc-700 hover:text-zinc-900"
                      } cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSort("transactionAction");
                      }}
                    >
                      Action {renderSortIndicator("transactionAction")}
                    </span>
                  </div>
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-zinc-700">
                  Shares
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-zinc-700">
                  <div className="flex flex-col gap-1 items-end">
                    <span>Net Amount</span>
                    <span>Currency</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => {
                  return (
                    <tr
                      key={txn.id}
                      className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="text-sm text-zinc-800">{txn.date}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-zinc-900">
                          {txn.code}
                        </div>
                        <TransactionActionBadge action={txn.action} />
                      </td>
                      <td className="p-4 text-center">
                        <div
                          className={`text-sm ${
                            txn.shares > 0 ? "text-zinc-800" : "text-zinc-400"
                          }`}
                        >
                          {txn.shares > 0 ? txn.shares : "—"}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div
                          className={`font-medium ${
                            txn.action === "SELL" || txn.action === "CASH_DIV"
                              ? "text-green-600"
                              : "text-zinc-900"
                          }`}
                        >
                          {txn.action === "SELL" || txn.action === "CASH_DIV"
                            ? "+"
                            : ""}
                          {txn.netAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-zinc-600">
                          {txn.currency}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td align="center" colSpan={4} className="py-5">
                    No available result
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
