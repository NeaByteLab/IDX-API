/**
 * Scraper feature definitions.
 * @description Structure for scraper features and URLs.
 */
export interface DigitalFeatures {
  /** Feature display label */
  label: string
  /** Official web page URL */
  webUrl: string
  /** Statistical API endpoint URL */
  apiUrl: string
}

/**
 * API response structure.
 * @description Format of the returned statistical data.
 */
export interface DigitalResponse {
  /** Statistical data table list */
  tableChartList?: {
    /** Array of statistical data values */
    value?: Array<{
      /** API endpoint alias name */
      alias: string
      /** Feature title override */
      title?: string
    }>
  }
}
