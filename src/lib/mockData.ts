// lib/mockData.ts
import { Transaction, TransactionAction, Holding } from "./types";

/**
 * Mock Transactions Data
 * Used for testing filtering and sorting functionality
 * Date range: 2022-2025 (covers multiple years for testing year/month filters)
 */
export const mockTransactions: Transaction[] = [
  // ============================================================================
  // 2022 Transactions
  // ============================================================================

  // US Market - VOO (Vanguard S&P 500 ETF) - Opening position
  {
    id: "txn-001",
    date: "2022-03-15",
    action: "OPENING" as TransactionAction,
    market: "US",
    code: "VOO",
    name: "Vanguard S&P 500 ETF",
    shares: 5,
    price: 380.0,
    grossAmount: 1900.0,
    fees: 0,
    netAmount: 1900.0,
    currency: "USD",
    notes: "Opening position transferred from another broker",
    createdAt: "2022-03-15T10:00:00Z",
    updatedAt: "2022-03-15T10:00:00Z",
  },

  // TW Market - 2330 (TSMC) - First purchase
  {
    id: "txn-002",
    date: "2022-06-20",
    action: "BUY" as TransactionAction,
    market: "TW",
    code: "2330",
    name: "台積電",
    shares: 50,
    price: 480.0,
    grossAmount: 24000.0,
    fees: 33.96,
    netAmount: 24033.96,
    currency: "TWD",
    createdAt: "2022-06-20T09:15:00Z",
    updatedAt: "2022-06-20T09:15:00Z",
  },

  // TW Market - 0050 (元大台灣50) - First purchase
  {
    id: "txn-003",
    date: "2022-09-10",
    action: "BUY" as TransactionAction,
    market: "TW",
    code: "0050",
    name: "元大台灣50",
    shares: 40,
    price: 115.0,
    grossAmount: 4600.0,
    fees: 6.51,
    netAmount: 4606.51,
    currency: "TWD",
    createdAt: "2022-09-10T11:00:00Z",
    updatedAt: "2022-09-10T11:00:00Z",
  },

  // US Market - AAPL (Apple) - First purchase
  {
    id: "txn-004",
    date: "2022-11-15",
    action: "BUY" as TransactionAction,
    market: "US",
    code: "AAPL",
    name: "Apple Inc.",
    shares: 15,
    price: 150.0,
    grossAmount: 2250.0,
    fees: 6.99,
    netAmount: 2256.99,
    currency: "USD",
    createdAt: "2022-11-15T15:00:00Z",
    updatedAt: "2022-11-15T15:00:00Z",
  },

  // ============================================================================
  // 2023 Transactions
  // ============================================================================

  // TW Market - 2330 (TSMC) - Additional purchase
  {
    id: "txn-005",
    date: "2023-01-25",
    action: "BUY" as TransactionAction,
    market: "TW",
    code: "2330",
    name: "台積電",
    shares: 50,
    price: 520.0,
    grossAmount: 26000.0,
    fees: 36.79,
    netAmount: 26036.79,
    currency: "TWD",
    createdAt: "2023-01-25T09:30:00Z",
    updatedAt: "2023-01-25T09:30:00Z",
  },

  // US Market - MSFT (Microsoft) - First purchase
  {
    id: "txn-006",
    date: "2023-04-12",
    action: "BUY" as TransactionAction,
    market: "US",
    code: "MSFT",
    name: "Microsoft Corporation",
    shares: 10,
    price: 310.0,
    grossAmount: 3100.0,
    fees: 6.99,
    netAmount: 3106.99,
    currency: "USD",
    createdAt: "2023-04-12T14:00:00Z",
    updatedAt: "2023-04-12T14:00:00Z",
  },

  // TW Market - 0050 - Cash Dividend
  {
    id: "txn-007",
    date: "2023-07-20",
    action: "CASH_DIV" as TransactionAction,
    market: "TW",
    code: "0050",
    name: "元大台灣50",
    shares: 0,
    price: 0,
    grossAmount: 1400.0,
    fees: 0,
    netAmount: 1400.0,
    currency: "TWD",
    notes: "Annual dividend",
    createdAt: "2023-07-20T00:00:00Z",
    updatedAt: "2023-07-20T00:00:00Z",
  },

  // US Market - VOO - Cash Dividend
  {
    id: "txn-008",
    date: "2023-09-20",
    action: "CASH_DIV" as TransactionAction,
    market: "US",
    code: "VOO",
    name: "Vanguard S&P 500 ETF",
    shares: 0,
    price: 0,
    grossAmount: 8.5,
    fees: 0,
    netAmount: 8.5,
    currency: "USD",
    notes: "Quarterly dividend payment",
    createdAt: "2023-09-20T09:00:00Z",
    updatedAt: "2023-09-20T09:00:00Z",
  },

  // TW Market - 2454 (聯發科) - First purchase
  {
    id: "txn-009",
    date: "2023-10-18",
    action: "BUY" as TransactionAction,
    market: "TW",
    code: "2454",
    name: "聯發科",
    shares: 30,
    price: 780.0,
    grossAmount: 23400.0,
    fees: 33.12,
    netAmount: 23433.12,
    currency: "TWD",
    createdAt: "2023-10-18T10:30:00Z",
    updatedAt: "2023-10-18T10:30:00Z",
  },

  // US Market - AAPL - Partial sell
  {
    id: "txn-010",
    date: "2023-12-05",
    action: "SELL" as TransactionAction,
    market: "US",
    code: "AAPL",
    name: "Apple Inc.",
    shares: 5,
    price: 192.0,
    grossAmount: 960.0,
    fees: 6.99,
    netAmount: 953.01,
    currency: "USD",
    realizedPnL: 203.02,
    realizedPnLPercent: 27.07,
    notes: "Partial profit taking",
    createdAt: "2023-12-05T16:00:00Z",
    updatedAt: "2023-12-05T16:00:00Z",
  },

  // ============================================================================
  // 2024 Transactions
  // ============================================================================

  // US Market - VOO - Additional purchase
  {
    id: "txn-011",
    date: "2024-02-14",
    action: "BUY" as TransactionAction,
    market: "US",
    code: "VOO",
    name: "Vanguard S&P 500 ETF",
    shares: 3,
    price: 430.0,
    grossAmount: 1290.0,
    fees: 6.99,
    netAmount: 1296.99,
    currency: "USD",
    createdAt: "2024-02-14T14:30:00Z",
    updatedAt: "2024-02-14T14:30:00Z",
  },

  // TW Market - 2330 - Stock Dividend
  {
    id: "txn-012",
    date: "2024-07-15",
    action: "DIVIDEND" as TransactionAction,
    market: "TW",
    code: "2330",
    name: "台積電",
    shares: 10,
    price: 0,
    grossAmount: 0,
    fees: 0,
    netAmount: 0,
    currency: "TWD",
    notes: "Stock dividend (1:10)",
    createdAt: "2024-07-15T00:00:00Z",
    updatedAt: "2024-07-15T00:00:00Z",
  },

  // TW Market - 2330 - Cash Dividend
  {
    id: "txn-013",
    date: "2024-07-15",
    action: "CASH_DIV" as TransactionAction,
    market: "TW",
    code: "2330",
    name: "台積電",
    shares: 0,
    price: 0,
    grossAmount: 3300.0,
    fees: 0,
    netAmount: 3300.0,
    currency: "TWD",
    notes: "Cash dividend: 3 TWD per share",
    createdAt: "2024-07-15T00:00:00Z",
    updatedAt: "2024-07-15T00:00:00Z",
  },

  // US Market - TSLA (Tesla) - First purchase
  {
    id: "txn-014",
    date: "2024-08-20",
    action: "BUY" as TransactionAction,
    market: "US",
    code: "TSLA",
    name: "Tesla Inc.",
    shares: 15,
    price: 240.0,
    grossAmount: 3600.0,
    fees: 6.99,
    netAmount: 3606.99,
    currency: "USD",
    createdAt: "2024-08-20T14:00:00Z",
    updatedAt: "2024-08-20T14:00:00Z",
  },

  // TW Market - 0050 - Additional purchase
  {
    id: "txn-015",
    date: "2024-09-25",
    action: "BUY" as TransactionAction,
    market: "TW",
    code: "0050",
    name: "元大台灣50",
    shares: 40,
    price: 135.0,
    grossAmount: 5400.0,
    fees: 7.64,
    netAmount: 5407.64,
    currency: "TWD",
    createdAt: "2024-09-25T14:15:00Z",
    updatedAt: "2024-09-25T14:15:00Z",
  },

  // US Market - MSFT - Cash Dividend
  {
    id: "txn-016",
    date: "2024-11-10",
    action: "CASH_DIV" as TransactionAction,
    market: "US",
    code: "MSFT",
    name: "Microsoft Corporation",
    shares: 0,
    price: 0,
    grossAmount: 7.5,
    fees: 0,
    netAmount: 7.5,
    currency: "USD",
    notes: "Quarterly dividend",
    createdAt: "2024-11-10T09:00:00Z",
    updatedAt: "2024-11-10T09:00:00Z",
  },

  // TW Market - 2454 - Partial sell
  {
    id: "txn-017",
    date: "2024-12-12",
    action: "SELL" as TransactionAction,
    market: "TW",
    code: "2454",
    name: "聯發科",
    shares: 10,
    price: 950.0,
    grossAmount: 9500.0,
    fees: 42.75,
    netAmount: 9457.25,
    currency: "TWD",
    realizedPnL: 1646.71,
    realizedPnLPercent: 21.08,
    createdAt: "2024-12-12T13:45:00Z",
    updatedAt: "2024-12-12T13:45:00Z",
  },

  // ============================================================================
  // 2025 Transactions
  // ============================================================================

  // TW Market - 2330 - Additional purchase
  {
    id: "txn-018",
    date: "2025-02-10",
    action: "BUY" as TransactionAction,
    market: "TW",
    code: "2330",
    name: "台積電",
    shares: 50,
    price: 600.0,
    grossAmount: 30000.0,
    fees: 42.45,
    netAmount: 30042.45,
    currency: "TWD",
    createdAt: "2025-02-10T09:15:00Z",
    updatedAt: "2025-02-10T09:15:00Z",
  },

  // US Market - VOO - Additional purchase
  {
    id: "txn-019",
    date: "2025-03-20",
    action: "BUY" as TransactionAction,
    market: "US",
    code: "VOO",
    name: "Vanguard S&P 500 ETF",
    shares: 2,
    price: 465.5,
    grossAmount: 931.0,
    fees: 6.99,
    netAmount: 937.99,
    currency: "USD",
    createdAt: "2025-03-20T14:30:00Z",
    updatedAt: "2025-03-20T14:30:00Z",
  },

  // US Market - AAPL - Additional purchase
  {
    id: "txn-020",
    date: "2025-05-10",
    action: "BUY" as TransactionAction,
    market: "US",
    code: "AAPL",
    name: "Apple Inc.",
    shares: 5,
    price: 182.5,
    grossAmount: 912.5,
    fees: 6.99,
    netAmount: 919.49,
    currency: "USD",
    createdAt: "2025-05-10T15:00:00Z",
    updatedAt: "2025-05-10T15:00:00Z",
  },

  // TW Market - 2454 - Additional purchase
  {
    id: "txn-021",
    date: "2025-06-15",
    action: "BUY" as TransactionAction,
    market: "TW",
    code: "2454",
    name: "聯發科",
    shares: 10,
    price: 1050.0,
    grossAmount: 10500.0,
    fees: 14.86,
    netAmount: 10514.86,
    currency: "TWD",
    createdAt: "2025-06-15T10:30:00Z",
    updatedAt: "2025-06-15T10:30:00Z",
  },

  // TW Market - 2330 - Stock Dividend
  {
    id: "txn-022",
    date: "2025-07-20",
    action: "DIVIDEND" as TransactionAction,
    market: "TW",
    code: "2330",
    name: "台積電",
    shares: 16,
    price: 0,
    grossAmount: 0,
    fees: 0,
    netAmount: 0,
    currency: "TWD",
    notes: "Stock dividend (1:10)",
    createdAt: "2025-07-20T00:00:00Z",
    updatedAt: "2025-07-20T00:00:00Z",
  },

  // TW Market - 2330 - Cash Dividend
  {
    id: "txn-023",
    date: "2025-08-05",
    action: "CASH_DIV" as TransactionAction,
    market: "TW",
    code: "2330",
    name: "台積電",
    shares: 0,
    price: 0,
    grossAmount: 5280.0,
    fees: 0,
    netAmount: 5280.0,
    currency: "TWD",
    notes: "Cash dividend: 3 TWD per share",
    createdAt: "2025-08-05T00:00:00Z",
    updatedAt: "2025-08-05T00:00:00Z",
  },

  // US Market - AAPL - Cash Dividend
  {
    id: "txn-024",
    date: "2025-08-12",
    action: "CASH_DIV" as TransactionAction,
    market: "US",
    code: "AAPL",
    name: "Apple Inc.",
    shares: 0,
    price: 0,
    grossAmount: 3.75,
    fees: 0,
    netAmount: 3.75,
    currency: "USD",
    notes: "Quarterly dividend",
    createdAt: "2025-08-12T09:00:00Z",
    updatedAt: "2025-08-12T09:00:00Z",
  },

  // TW Market - 0050 - Cash Dividend
  {
    id: "txn-025",
    date: "2025-08-15",
    action: "CASH_DIV" as TransactionAction,
    market: "TW",
    code: "0050",
    name: "元大台灣50",
    shares: 0,
    price: 0,
    grossAmount: 2800.0,
    fees: 0,
    netAmount: 2800.0,
    currency: "TWD",
    notes: "Annual dividend",
    createdAt: "2025-08-15T00:00:00Z",
    updatedAt: "2025-08-15T00:00:00Z",
  },

  // US Market - TSLA - Stock Split
  {
    id: "txn-026",
    date: "2025-08-25",
    action: "SPLIT" as TransactionAction,
    market: "US",
    code: "TSLA",
    name: "Tesla Inc.",
    shares: 15,
    price: 0,
    grossAmount: 0,
    fees: 0,
    netAmount: 0,
    currency: "USD",
    notes: "2-for-1 stock split (15 → 30 shares total)",
    createdAt: "2025-08-25T00:00:00Z",
    updatedAt: "2025-08-25T00:00:00Z",
  },

  // US Market - MSFT - Cash Dividend
  {
    id: "txn-027",
    date: "2025-09-10",
    action: "CASH_DIV" as TransactionAction,
    market: "US",
    code: "MSFT",
    name: "Microsoft Corporation",
    shares: 0,
    price: 0,
    grossAmount: 7.5,
    fees: 0,
    netAmount: 7.5,
    currency: "USD",
    notes: "Quarterly dividend",
    createdAt: "2025-09-10T09:00:00Z",
    updatedAt: "2025-09-10T09:00:00Z",
  },

  // US Market - VOO - Cash Dividend
  {
    id: "txn-028",
    date: "2025-09-20",
    action: "CASH_DIV" as TransactionAction,
    market: "US",
    code: "VOO",
    name: "Vanguard S&P 500 ETF",
    shares: 0,
    price: 0,
    grossAmount: 12.5,
    fees: 0,
    netAmount: 12.5,
    currency: "USD",
    notes: "Quarterly dividend payment",
    createdAt: "2025-09-20T09:00:00Z",
    updatedAt: "2025-09-20T09:00:00Z",
  },

  // US Market - AAPL - Partial sell
  {
    id: "txn-029",
    date: "2025-09-25",
    action: "SELL" as TransactionAction,
    market: "US",
    code: "AAPL",
    name: "Apple Inc.",
    shares: 5,
    price: 195.8,
    grossAmount: 979.0,
    fees: 6.99,
    netAmount: 972.01,
    currency: "USD",
    realizedPnL: 52.52,
    realizedPnLPercent: 5.71,
    createdAt: "2025-09-25T16:00:00Z",
    updatedAt: "2025-09-25T16:00:00Z",
  },

  // TW Market - 2330 - Partial sell
  {
    id: "txn-030",
    date: "2025-10-15",
    action: "SELL" as TransactionAction,
    market: "TW",
    code: "2330",
    name: "台積電",
    shares: 10,
    price: 585.0,
    grossAmount: 5850.0,
    fees: 26.33,
    netAmount: 5823.67,
    currency: "TWD",
    realizedPnL: 73.67,
    realizedPnLPercent: 1.28,
    notes: "Partial sell",
    createdAt: "2025-10-15T10:30:00Z",
    updatedAt: "2025-10-15T10:30:00Z",
  },

  // US Market - VOO - Latest purchase
  {
    id: "txn-031",
    date: "2025-10-28",
    action: "BUY" as TransactionAction,
    market: "US",
    code: "VOO",
    name: "Vanguard S&P 500 ETF",
    shares: 1,
    price: 520.0,
    grossAmount: 520.0,
    fees: 6.99,
    netAmount: 526.99,
    currency: "USD",
    createdAt: "2025-10-28T15:45:00Z",
    updatedAt: "2025-10-28T15:45:00Z",
  },
];

/**
 * Mock Holdings Data
 */
export const mockHoldings: Holding[] = [
  {
    market: "US",
    code: "VOO",
    name: "Vanguard S&P 500 ETF",
    currency: "USD",
    shares: 11, // 5 (opening) + 3 (2024) + 2 (2025) + 1 (2025)
    avgCost: 398.45, // Total cost / shares
    costBasis: 4382.97, // 1900 + 1296.99 + 937.99 + 526.99 - fees included
    currentPrice: 535.0,
    marketValue: 5885.0,
    unrealizedPnL: 1502.03,
    returnPercent: 37.7,
    firstBuyDate: "2022-03-15",
    lastTransactionDate: "2025-10-28",
  },
  {
    market: "TW",
    code: "2330",
    name: "台積電",
    currency: "TWD",
    shares: 176, // 50 + 50 + 10 (div 2024) + 50 + 16 (div 2025) - 10 (sold)
    avgCost: 512.96, // Total cost / shares
    costBasis: 90281.15, // Sum of all purchases + fees
    currentPrice: 590.0,
    marketValue: 103840.0,
    unrealizedPnL: 13558.85,
    returnPercent: 15.02,
    firstBuyDate: "2022-06-20",
    lastTransactionDate: "2025-10-15",
  },
  {
    market: "TW",
    code: "0050",
    name: "元大台灣50",
    currency: "TWD",
    shares: 80, // 40 (2022) + 40 (2024)
    avgCost: 125.18, // Total cost / shares
    costBasis: 10014.15, // 4606.51 + 5407.64
    currentPrice: 145.5,
    marketValue: 11640.0,
    unrealizedPnL: 1625.85,
    returnPercent: 16.24,
    firstBuyDate: "2022-09-10",
    lastTransactionDate: "2024-09-25",
  },
  {
    market: "US",
    code: "AAPL",
    name: "Apple Inc.",
    currency: "USD",
    shares: 10, // 15 - 5 (2023 sell) + 5 - 5 (2025 sell)
    avgCost: 231.65, // Total cost / current shares
    costBasis: 2316.48, // (2256.99 + 919.49) - profit from sells
    currentPrice: 198.5,
    marketValue: 1985.0,
    unrealizedPnL: -331.48,
    returnPercent: -14.31,
    firstBuyDate: "2022-11-15",
    lastTransactionDate: "2025-09-25",
  },
  {
    market: "US",
    code: "MSFT",
    name: "Microsoft Corporation",
    currency: "USD",
    shares: 10,
    avgCost: 310.7, // 3106.99 / 10
    costBasis: 3106.99,
    currentPrice: 415.0,
    marketValue: 4150.0,
    unrealizedPnL: 1043.01,
    returnPercent: 33.57,
    firstBuyDate: "2023-04-12",
    lastTransactionDate: "2023-04-12",
  },
  {
    market: "TW",
    code: "2454",
    name: "聯發科",
    currency: "TWD",
    shares: 20, // 30 - 10 (2024 sell) + 10
    avgCost: 1097.4, // Weighted average cost
    costBasis: 21947.98, // 23433.12 + 10514.86 - realized P&L from sell
    currentPrice: 1050.0,
    marketValue: 21000.0,
    unrealizedPnL: -947.98,
    returnPercent: -4.32,
    firstBuyDate: "2023-10-18",
    lastTransactionDate: "2025-06-15",
  },
  {
    market: "US",
    code: "TSLA",
    name: "Tesla Inc.",
    currency: "USD",
    shares: 30, // 15 (initial) + 15 (2-for-1 split)
    avgCost: 120.23, // 3606.99 / 30 (cost basis spread across all shares after split)
    costBasis: 3606.99,
    currentPrice: 142.5,
    marketValue: 4275.0,
    unrealizedPnL: 668.01,
    returnPercent: 18.52,
    firstBuyDate: "2024-08-20",
    lastTransactionDate: "2025-08-25",
  },
];
