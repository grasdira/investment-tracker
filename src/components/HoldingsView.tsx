// src/components/HoldingsView.tsx
"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Select from "./ui/Select";

type Market = "TW" | "US" | "ALL";
type SortField = "code" | "shares" | "marketValue" | "unrealizedPnL" | "return";
type SortDirection = "asc" | "desc";

export default function HoldingsView() {
  const [market, setMarket] = useState<Market>("ALL");
  const [sortField, setSortField] = useState<SortField>("marketValue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const marketOptions = [
    { value: "ALL", label: "All Markets" },
    { value: "TW", label: "TW" },
    { value: "US", label: "US" },
  ];

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

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col items-start gap-2 w-full py-4 border-b border-zinc-200">
        <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Hi, Ruth
        </h1>

        <div className="text-zinc-600 dark:text-zinc-400 text-sm">
          Total Market Value
        </div>

        <div className="text-3xl font-bold">700,000</div>

        <div className="flex w-full overflow-hidden rounded-sm">
          <div className="bg-amber-500/70 w-2/3 text-center text-white/90 py-1 text-xs font-medium transition-all">
            TW 66%
          </div>
          <div className="bg-amber-400/80 w-1/3 text-center text-white/90 py-1 text-xs font-medium transition-all">
            US 34%
          </div>
        </div>

        <div className="text-zinc-400 text-xs">
          {`last updated at ${new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4 py-4 w-full">
        <div className="flex gap-2">
          <Select
            value={market}
            onChange={(value) => setMarket(value as Market)}
            options={marketOptions}
          />
        </div>

        {/* Holdings Table */}
        <div className="overflow-x-auto">
          <table className="table-fixed w-full border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 select-none">
                <th
                  className={`py-3 px-4 text-sm font-semibold ${
                    sortField === "code"
                      ? "text-amber-500"
                      : "text-zinc-700 hover:text-zinc-900"
                  } cursor-pointer`}
                  onClick={() => handleSort("code")}
                >
                  Code {renderSortIndicator("code")}
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-right">
                  <span
                    className={`${
                      sortField === "shares"
                        ? "text-amber-500"
                        : "text-zinc-700 hover:text-zinc-900"
                    } cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSort("shares");
                    }}
                  >
                    Shares {renderSortIndicator("shares")}
                  </span>
                  <br />
                  <span
                    className={`${
                      sortField === "marketValue"
                        ? "text-amber-500"
                        : "text-zinc-700 hover:text-zinc-900"
                    } cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSort("marketValue");
                    }}
                  >
                    Market Value {renderSortIndicator("marketValue")}
                  </span>
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-right">
                  <span
                    className={`${
                      sortField === "unrealizedPnL"
                        ? "text-amber-500"
                        : "text-zinc-700 hover:text-zinc-900"
                    } cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSort("unrealizedPnL");
                    }}
                  >
                    Unrealized P&L {renderSortIndicator("unrealizedPnL")}
                  </span>
                  <br />
                  <span
                    className={`${
                      sortField === "return"
                        ? "text-amber-500"
                        : "text-zinc-700 hover:text-zinc-900"
                    } cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSort("return");
                    }}
                  >
                    Return {renderSortIndicator("return")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                <td className="p-4 text-center">
                  <div className="font-semibold">VOO</div>
                  <div className="text-xs text-zinc-500">
                    Vanguard S&P 500 ETF
                  </div>
                  <div className="text-xs text-zinc-400">US</div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium">2</div>
                  <div className="text-sm text-zinc-600">28350 TWD</div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-green-600">+3150</div>
                  <div className="text-sm text-green-600">+12.50%</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
