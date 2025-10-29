// app/lib/types.ts

/**
 * ============================================================================
 * Transaction Types - 交易記錄
 * ============================================================================
 */

/**
 * Transaction Action Types
 *
 * @example
 * OPENING   - 期初持股，從其他地方轉入的初始持倉
 * BUY       - 一般買入
 * SELL      - 賣出（會產生 realizedPnL）
 * DIVIDEND  - 股票股利/配股（增加股數，成本為0）
 * SPLIT     - 股票分割（增加股數，總成本不變）
 * CASH_DIV  - 現金股利/配息（不影響持股）
 */
export type TransactionAction =
  | "OPENING"
  | "BUY"
  | "SELL"
  | "DIVIDEND"
  | "SPLIT"
  | "CASH_DIV";
