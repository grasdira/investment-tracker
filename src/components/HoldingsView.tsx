// src/components/HoldingsView.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Select from "./ui/Select";
import { Market, SortDirection, HoldingsSortField, Holding } from "@/lib/types";
import { filterHoldings, sortHoldings } from "@/lib/utils/transactions";
import { mockHoldings } from "@/lib/mockData";

// TODO [issue] currency is different when calculating and sorting

export default function HoldingsView() {
  // data state
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filter state
  const [market, setMarket] = useState<Market | "ALL">("ALL");

  // sort state
  const [sortField, setSortField] = useState<HoldingsSortField>("marketValue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const marketOptions = [
    { value: "ALL", label: "All Markets" },
    { value: "TW", label: "TW" },
    { value: "US", label: "US" },
  ];

  const handleSort = (field: HoldingsSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const renderSortIndicator = (field: HoldingsSortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="inline w-4 h-4 text-amber-500" />
    ) : (
      <ChevronDown className="inline w-4 h-4 text-amber-500" />
    );
  };

  // filter and sort data
  const filteredHoldings = useMemo(() => {
    if (holdings.length === 0) return [];

    const result = filterHoldings(holdings, {
      market,
    });

    return sortHoldings(result, sortField, sortDirection);
  }, [holdings, market, sortField, sortDirection]);

  // Fetch holdings on mount
  useEffect(() => {
    loadHoldings();
  }, []);

  const loadHoldings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch user's holdings
      const holdings = mockHoldings;

      setHoldings(holdings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load holdings");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-zinc-600">Loading holdings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={loadHoldings}
          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
        >
          Retry
        </button>
      </div>
    );
  }

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
              {filteredHoldings.length > 0 ? (
                filteredHoldings.map((holding) => {
                  return (
                    <tr
                      className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                      key={holding.code}
                    >
                      <td className="p-4 text-center">
                        <div className="font-semibold">{holding.code}</div>
                        <div className="text-xs text-zinc-500">
                          {holding.name}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {holding.market}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium">{holding.shares}</div>
                        <div className="text-sm text-zinc-600">{`${holding.marketValue.toLocaleString()} ${
                          holding.currency
                        }`}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div
                          className={`font-medium ${
                            holding.unrealizedPnL > 0
                              ? "text-green-600"
                              : "text-red-600"
                          } `}
                        >
                          <span>{`${
                            holding.unrealizedPnL > 0 ? "+" : ""
                          }${holding.unrealizedPnL.toLocaleString()} `}</span>
                          <span className="text-xs text-zinc-600">
                            {holding.currency}
                          </span>
                        </div>
                        <div
                          className={`text-sm ${
                            holding.returnPercent >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {holding.returnPercent >= 0 ? "+" : ""}
                          {holding.returnPercent.toFixed(2)}%
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
    </div>
  );
}
