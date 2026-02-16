/**
 * Market calendar event structure.
 * @description Defines fields for single calendar occurrences.
 */
export interface CalendarEvent {
  /** Event description */
  description: string
  /** Agenda year */
  year: string
}

/**
 * Market calendar response structure.
 * @description Wrapper for multiple calendar event results.
 */
export interface CalendarResponse {
  /** Total results found */
  resultCount: number
  /** List of calendar events */
  results: CalendarEvent[]
}

/**
 * Individual chart data point.
 * @description Defines single time-series value for charts.
 */
export interface ChartPoint {
  /** Timestamp or date string */
  date: string
  /** Numeric value at that point */
  value: number
}

/**
 * Historical index chart response.
 * @description Wrapper for time-series and price metadata.
 */
export interface IndexChartResponse {
  /** Chart data points */
  chartData: ChartPoint[]
  /** Optional index meta information */
  indexCode?: string
  /** Price information */
  openPrice?: number
  maxPrice?: number
  minPrice?: number
}

/**
 * Market index price data.
 * @description Defines fields for current index values.
 */
export interface IndexData {
  /** Market index code (e.g. COMPOSITE) */
  code: string
  /** Closing price value */
  close: string
  /** Price change value */
  change: string
  /** Percentage change string */
  percent: string
  /** Current index value */
  current: string
}
