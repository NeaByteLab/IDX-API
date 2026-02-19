import BaseClient from '@app/Client.ts'
import type * as Types from '@app/Market/Types.ts'

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
      const response = await fetch(
        `https://www.idx.co.id/primary/Home/GetCalendar?range=m&date=${date}`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.Results) {
        return null
      }
      return {
        resultCount: rawResponse.ResultCount,
        results: rawResponse.Results.map(
          (item: {
            id: number
            title: string
            Jenis: string
            description: string
            location: string
            Step: string
            start: string
            AgendaTahun: string
          }) => ({
            id: item.id,
            code: item.title,
            type: item.Jenis,
            description: item.description,
            location: item.location,
            step: item.Step,
            date: item.start,
            year: item.AgendaTahun
          })
        )
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch daily index historical performance.
   * @description Returns time-series data for a market index.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns Daily index historical data
   */
  async getDailyIndices(year: number, month: number): Promise<Types.DailyIndexData[] | null> {
    await this.ensureSession()
    try {
      const queryObj = { year, month, quarter: 0, type: 'monthly' }
      const queryBase64 = btoa(JSON.stringify(queryObj))
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_DAILY_IDX_INDICES&query=${queryBase64}&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.data || !Array.isArray(rawResponse.data)) {
        return null
      }
      return rawResponse.data.map((item: { Name: string; close: string; months: unknown }) => ({
        name: item.Name,
        closeVal: item.close,
        points: Array.isArray(item.months)
          ? item.months.map((m: { date: string; close?: { value: number } }) => ({
            date: m.date,
            close: m.close?.value || 0
          }))
          : []
      }))
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
      const response = await fetch(
        `https://www.idx.co.id/primary/helper/GetIndexChart?indexCode=${indexCode}&period=${period}`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
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

  /**
   * Fetch sectoral movement data.
   * @description Returns performance comparison between indices over time.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns Sectoral movement time-series data
   */
  async getSectoralMovement(
    year: number,
    month: number
  ): Promise<Types.SectoralMovementResponse | null> {
    await this.ensureSession()
    try {
      const queryObj = { year, month, quarter: 0, type: 'monthly' }
      const queryBase64 = btoa(JSON.stringify(queryObj))
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_DPS_JCI_SECTORAL_MOVEMENT&query=${queryBase64}&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.series || !Array.isArray(rawResponse.series)) {
        return null
      }
      return {
        title: rawResponse.title || '',
        subtitle: rawResponse.subtitle || '',
        series: rawResponse.series.map((s: { seriesName: string; seriesData: unknown }) => ({
          name: s.seriesName,
          points: Array.isArray(s.seriesData)
            ? s.seriesData.map((p: { x: string; y: number }) => ({
              date: p.x,
              change: p.y
            }))
            : []
        }))
      }
    } catch {
      return null
    }
  }
}
