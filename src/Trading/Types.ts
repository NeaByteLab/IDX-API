/**
 * Bond trading summary structure.
 * @description Defines fields for bond market activity records.
 */
export interface BondSummary {
  /** Bond type description */
  description: string
  /** Trading volume */
  volume: number
  /** Trading frequency */
  frequency: number
}

/**
 * Broker trading summary structure.
 * @description Defines fields for broker-specific trading volume.
 */
export interface BrokerSummary {
  /** Unique IDX record identifier */
  idBrokerSummary: number
  /** Record statement date */
  date: Date
  /** Unique firm identifier */
  brokerCode: string
  /** Registered firm name */
  brokerName: string
  /** Aggregate trade value */
  totalValue: number
  /** Aggregate trade volume */
  volume: number
  /** Total trade frequency */
  frequency: number
}

/**
 * Margin trading summary structure.
 * @description Defines fields for stock margin eligibility.
 */
export interface MarginSummary {
  /** Stock ticker code */
  code: string
  /** Margin type or notes */
  notes: string
}

/**
 * Stock trading summary structure.
 * @description Defines fields for daily stock price activity.
 */
export interface StockSummary {
  /** Stock ticker code */
  code: string
  /** Last price */
  close: number
  /** Change value */
  change: number
}

/**
 * General trade summary structure.
 * @description Defines fields for market segment trading data.
 */
export interface TradeSummary {
  /** Market segment description */
  description: string
  /** Trading volume */
  volume: number
  /** Trading value */
  value: number
  /** Trading frequency */
  frequency: number
  /** Date string */
  date: string
}

/**
 * Generic trading response wrapper.
 * @description Standard structure for paginated trading data results.
 */
export interface TradingResponse<T> {
  /** List of trading records */
  data: T[]
  /** Total record count */
  recordsTotal: number
}
