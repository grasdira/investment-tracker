// lib/types.ts

/**
 * ============================================================================
 * Transaction Types - 交易記錄
 * ============================================================================
 */

/**
 * Transaction Action Types
 *
 * @example
 * OPENING   - Opening position, initial holdings transferred from elsewhere 期初持股，從其他地方轉入的初始持倉
 * BUY       - Regular purchase 一般買入
 * SELL      - Sale (generates realizedPnL) 賣出（會產生 realizedPnL）
 * DIVIDEND  - Stock dividend (increases shares, cost is 0) 股票股利/配股（增加股數，成本為0）
 * SPLIT     - Stock split (increases shares, total cost remains same) 股票分割（增加股數，總成本不變）
 * CASH_DIV  - Cash dividend (does not affect holdings) 現金股利/配息（不影響持股）
 */
export type TransactionAction =
  | "OPENING"
  | "BUY"
  | "SELL"
  | "DIVIDEND"
  | "SPLIT"
  | "CASH_DIV";

/**
 * Market Type 股市市場
 */
export type Market = "TW" | "US";

/**
 * Currency Type 貨幣
 */
export type Currency = "TWD" | "USD";

/**
 * Transaction - Single Transaction Record 單筆交易記錄
 *
 * @description
 * Records detailed information for each transaction
 * All Holdings are calculated from Transactions
 * (記錄每一筆交易的詳細資訊，所有 Holding 都是從 Transactions 計算而來)
 *
 */
export interface Transaction {
  id: string;
  date: string; // 交易日期 Transaction date (YYYY-MM-DD)
  action: TransactionAction; // 交易類型 Transaction type
  market: Market; // 市場別 Market
  code: string; // 股票代碼 Stock code (e.g., '2330', 'AAPL')
  name: string; // 股票名稱 Stock name (e.g., '台積電', 'Apple Inc.')
  shares: number; // 股數 Number of shares
  price: number; // 每股單價 Price per share
  grossAmount: number; // 成交金額 Transaction amount = shares × price
  fees: number; // 手續費 Commission + 交易稅 transaction tax
  netAmount: number; // 實付實收金額 Net amount (BUY: gross+fees, SELL: gross-fees)
  currency: Currency; // 幣別 Currency
  realizedPnL?: number; // 已實現損益 Realized P&L (only for SELL)
  realizedPnLPercent?: number; // 已實現報酬率 Realized return % (only for SELL)
  notes?: string; // Notes
  createdAt: string; // Record creation time (ISO 8601)
  updatedAt: string; // Record update time (ISO 8601)
}

/**
 * ============================================================================
 * Filter & Sort Types - UI State Management
 * ============================================================================
 */

/**
 * Transaction Sort Field
 */
export type TransactionSortField =
  | "code"
  | "date"
  | "transactionAction"
  | "netAmount";

/**
 * Holdings Sort Field
 */
export type HoldingsSortField =
  | "code"
  | "shares"
  | "marketValue"
  | "unrealizedPnL"
  | "return";

/**
 * Sort Direction
 */
export type SortDirection = "asc" | "desc";
