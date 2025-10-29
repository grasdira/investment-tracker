"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

// UI Types
type Currency = "TWD" | "USD";
type Market = "TW" | "US" | "ALL";
type ViewMode = "Holdings" | "Transactions";
type SortField = "code" | "shares" | "marketValue" | "unrealizedPnL" | "return";
type SortDirection = "asc" | "desc";

export default function Home() {
  const [currency, setCurrency] = useState<Currency>("TWD");
  const [market, setMarket] = useState<Market>("ALL");
  const [viewMode, setViewMode] = useState<ViewMode>("Holdings");
  const [sortField, setSortField] = useState<SortField>("marketValue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="inline w-4 h-4" />
    ) : (
      <ChevronDown className="inline w-4 h-4" />
    );
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-fit w-full max-w-3xl flex-col items-start justify-between py-32 px-8 sm:px-12 md:px-16 bg-white dark:bg-black">
        {/* Header Section */}
        {viewMode === "Holdings" && (
          <div className="flex flex-col items-start gap-2 text-center sm:text-left w-full py-4 border-b border-zinc-200">
            {/* // TODO userName from google Oauth */}
            <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Hi, Ruth
            </h1>

            <div className="text-zinc-600 dark:text-zinc-400 text-sm">
              Total Market Value
            </div>

            <div className="flex items-end gap-2">
              {/* Switch Currency */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="appearance-none px-3 py-1.5 rounded-md bg-white text-sm font-medium focus:outline-none"
              >
                <option>TWD</option>
                <option>USD</option>
              </select>

              {/* // TODO totalMarketValue by calculation and Yahoo Finance API */}
              <div className="text-3xl font-bold">700,000</div>
            </div>

            {/* Weight Bar - // TODO calculate twWeight & usWeight */}
            <div className="flex w-full overflow-hidden rounded-sm">
              {/* Show TW Stock and US Stock weight */}
              <div
                className="bg-sky-600 w-2/3 text-center text-white/80 py-1 text-xs font-medium transition-all"
                // style={{ width: `${twWeight}%` }}
              >
                TW 66%
                {/* {twWeight > 15 && `TW ${twWeight.toFixed(0)}%`} */}
              </div>
              <div
                className="bg-purple-600 w-1/3 text-center text-white/80 py-1 text-xs font-medium transition-all"
                // style={{ width: `${usWeight}%` }}
              >
                US 34%
                {/* {usWeight > 15 && `US ${usWeight.toFixed(0)}%`} */}
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
        )}

        {/* // TODO Transactions View Header - Placeholder */}
        {viewMode === "Transactions" && (
          <div className="text-center py-12 text-zinc-400">
            <p className="mb-2">Cash Invested</p>
            <p className="mb-2">Cash Dividends</p>
            <p className="mb-2">Total Realized P&L</p>
          </div>
        )}

        {/* Filters Section */}
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2">
            {/* View Mode Select */}
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as ViewMode)}
              className="appearance-none px-3 py-1.5 rounded-md bg-zinc-100 text-sm font-medium focus:outline-none"
            >
              <option>Holdings</option>
              <option>Transactions</option>
            </select>

            {/* Market Select */}
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value as Market)}
              className="appearance-none px-3 py-1.5 rounded-md bg-zinc-100 text-sm font-medium focus:outline-none"
            >
              <option>ALL</option>
              <option>TW</option>
              <option>US</option>
            </select>
          </div>

          {/* Holdings Table - // TODO - data fetching, calculation and rendering */}
          {viewMode === "Holdings" && (
            <div className="overflow-x-auto">
              <table className="table-fixed w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 select-none">
                    <th
                      className="py-3 px-4 text-sm font-semibold text-zinc-700 cursor-pointer hover:text-zinc-900"
                      onClick={() => handleSort("code")}
                    >
                      Code {renderSortIndicator("code")}
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-semibold text-zinc-700 text-right cursor-pointer hover:text-zinc-900"
                      onClick={() => handleSort("shares")}
                    >
                      Shares {renderSortIndicator("shares")}
                      <br />
                      <span
                        className="cursor-pointer hover:text-zinc-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSort("marketValue");
                        }}
                      >
                        Market Value {renderSortIndicator("marketValue")}
                      </span>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-semibold text-zinc-700 text-right cursor-pointer hover:text-zinc-900"
                      onClick={() => handleSort("unrealizedPnL")}
                    >
                      Unrealized P&L {renderSortIndicator("unrealizedPnL")}
                      <br />
                      <span
                        className="cursor-pointer hover:text-zinc-900"
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
                  {/* // TODO - data rendering */}
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
                      <div className={`font-medium text-green-600`}>+3150</div>
                      <div className={`text-sm text-green-600`}>+12.50%</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {/* // TODO - Transactions View - Placeholder */}
          {viewMode === "Transactions" && (
            <div className="text-center py-12 text-zinc-400">
              <p className="mb-2">Transactions view coming soon</p>
              <p className="text-xs">This will show your transaction history</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
