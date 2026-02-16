import type * as Types from '@app/Market/Types.ts'
import BaseClient from '@app/Client.ts'

/**
 * Market data module.
 * @description Handles indices and market calendar operations.
 */
export default class MarketModule extends BaseClient {
  /**
   * Fetch market calendar events.
   * @description Returns agenda and events for specified date.
   * @param date - Date in YYYYMMDD format
   * @returns Market calendar response data
   */
  async getCalendar(date: string): Promise<Types.CalendarResponse | null> {
    await this.ensureSession()
    try {
      const url = `https://www.idx.co.id/primary/Home/GetCalendar?range=m&date=${date}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.Results) {
        return null
      }
      return {
        resultCount: rawResponse.ResultCount,
        results: rawResponse.Results.map((item: { description: string; AgendaTahun: string }) => ({
          description: item.description,
          year: item.AgendaTahun
        }))
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch historical index chart data.
   * @description Returns time-series data for a specific index.
   * @param indexCode - Target index code
   * @param period - Time frame (1D, 1W, 1M, 1Q, 1Y)
   * @returns Historical chart response data
   */
  async getIndexChart(indexCode: string, period = '1D'): Promise<Types.IndexChartResponse | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/helper/GetIndexChart?indexCode=${indexCode}&period=${period}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.ChartData) {
        return null
      }
      return {
        chartData: rawResponse.ChartData.map((point: { Date: string; Value: number }) => ({
          date: point.Date,
          value: point.Value
        })),
        indexCode: rawResponse.IndexCode,
        openPrice: rawResponse.OpenPrice,
        maxPrice: rawResponse.MaxPrice,
        minPrice: rawResponse.MinPrice
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch market indices list.
   * @description Returns current prices and changes for all indices.
   * @returns Array of market index data
   */
  async getIndexList(): Promise<Types.IndexData[] | null> {
    await this.ensureSession()
    try {
      const response = await fetch('https://www.idx.co.id/primary/home/GetIndexList', {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!Array.isArray(rawResponse)) {
        return null
      }
      return rawResponse.map(
        (item: {
          IndexCode: string
          Closing: string
          Change: string
          Percent: string
          Current: string
        }) => ({
          code: item.IndexCode,
          close: item.Closing,
          change: item.Change,
          percent: item.Percent,
          current: item.Current
        })
      )
    } catch {
      return null
    }
  }
}
