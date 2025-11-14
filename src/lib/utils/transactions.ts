// lib/utils/transactions.ts
import {
  Transaction,
  Market,
  SortDirection,
  TransactionSortField,
  Holding,
  HoldingsSortField,
} from "@/lib/types";

/**
 * Filter transactions based on criteria
 */
export function filterTransactions(
  transactions: Transaction[],
  filters: {
    market?: Market | "ALL";
    action?: string;
    year?: string;
    month?: string;
  }
): Transaction[] {
  let filtered = [...transactions];

  // Filter by market
  if (filters.market && filters.market !== "ALL") {
    filtered = filtered.filter((t) => t.market === filters.market);
  }

  // Filter by action
  if (filters.action && filters.action !== "ALL") {
    filtered = filtered.filter((t) => t.action === filters.action);
  }

  // Filter by year
  if (filters.year && filters.year !== "") {
    const year = filters.year;
    filtered = filtered.filter((t) => t.date.startsWith(year));
  }

  // Filter by month (requires year to be set)
  if (filters.month && filters.month !== "ALL" && filters.year) {
    const yearMonth = `${filters.year}-${filters.month}`;
    filtered = filtered.filter((t) => t.date.startsWith(yearMonth));
  }

  return filtered;
}

/**
 * Sort transactions
 */
export function sortTransactions(
  transactions: Transaction[],
  sortField: TransactionSortField,
  sortDirection: SortDirection
): Transaction[] {
  const sorted = [...transactions].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "code":
        comparison = a.code.localeCompare(b.code);
        break;
      case "date":
        comparison = a.date.localeCompare(b.date);
        break;
      case "transactionAction":
        comparison = a.action.localeCompare(b.action);
        break;
      // case "netAmount":
      //   comparison = a.netAmount - b.netAmount;
      //   break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Filter holdings based on criteria
 */
export function filterHoldings(
  holdings: Holding[],
  filters: {
    market?: Market | "ALL";
  }
): Holding[] {
  let filtered = [...holdings];

  if (filters.market && filters.market !== "ALL") {
    filtered = filtered.filter((h) => h.market === filters.market);
  }

  return filtered;
}

/**
 * Sort holdings
 */
export function sortHoldings(
  holdings: Holding[],
  sortField: HoldingsSortField,
  sortDirection: SortDirection
): Holding[] {
  const sorted = [...holdings].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "code":
        comparison = a.code.localeCompare(b.code);
        break;
      case "shares":
        comparison = a.shares - b.shares;
        break;
      case "marketValue":
        comparison = a.marketValue - b.marketValue;
        break;
      case "unrealizedPnL":
        comparison = a.unrealizedPnL - b.unrealizedPnL;
        break;
      case "return":
        comparison = a.returnPercent - b.returnPercent;
        break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return sorted;
}

