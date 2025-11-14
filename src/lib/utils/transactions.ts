// lib/utils/transactions.ts
import {
  Transaction,
  Market,
  SortDirection,
  TransactionSortField,
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
