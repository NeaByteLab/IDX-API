/**
 * Market calendar event structure.
 * @description Defines fields for single calendar occurrences.
 */
export interface CalendarEvent {
  /** Event unique ID */
  id: number
  /** Event title (usually stock code) */
  code: string
  /** Event category/type */
  type: string
  /** Event description */
  description: string
  /** Event location or link */
  location: string
  /** Current process step */
  step: string
  /** Event starting timestamp */
  date: string
  /** Agenda year record */
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
 * Daily IDX indices response.
 * @description Time-series data for a market index.
 */
export interface DailyIndexData {
  /** Index name */
  name: string
  /** Latest closing price */
  closeVal: string
  /** Monthly performance points */
  points: DailyIndexPoint[]
}

/**
 * Daily IDX index data point.
 * @description Single day record of index performance.
 */
export interface DailyIndexPoint {
  /** Date of record */
  date: string
  /** Closing price */
  close: number
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

/**
 * Sectoral movement response.
 * @description Collection of all sectoral performances.
 */
export interface SectoralMovementResponse {
  /** Report title */
  title: string
  /** Report date range */
  subtitle: string
  /** Sector data series */
  series: SectoralSeries[]
}

/**
 * Sectoral movement data point.
 * @description Single day record of sector movement.
 */
export interface SectoralPoint {
  /** Date of record */
  date: string
  /** Percentage change */
  change: number
}

/**
 * Sectoral movement series.
 * @description performance data for a specific sector.
 */
export interface SectoralSeries {
  /** Sector name */
  name: string
  /** Time-series data points */
  points: SectoralPoint[]
}
