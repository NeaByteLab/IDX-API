import type * as Types from '@app/Trading/Types.ts'
import BaseClient from '@app/Client.ts'

/**
 * Trading summaries module.
 * @description Handles broker, margin, stock, and bond summaries.
 */
export default class TradingModule extends BaseClient {
  /**
   * Fetch bond trading summary.
   * @returns List of bond summary records
   */
  async getBondSummary(): Promise<Types.BondSummary[] | null> {
    await this.ensureSession()
    try {
      const response = await fetch('https://www.idx.co.id/primary/Home/GetBondSummary', {
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
        (item: { DESCRIPTION: string; Volume: number; Frequency: number }) => ({
          description: item.DESCRIPTION,
          volume: item.Volume,
          frequency: item.Frequency
        })
      )
    } catch {
      return null
    }
  }

  /**
   * Fetch broker trading summary.
   * @param date - Date in YYYYMMDD format
   * @param start - Start record index
   * @param length - Maximum record count
   * @returns Paginated broker summary data
   */
  async getBrokerSummary(
    date: string,
    start = 0,
    length = 9999
  ): Promise<Types.TradingResponse<Types.BrokerSummary> | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/TradingSummary/GetBrokerSummary?length=${length}&start=${start}&date=${date}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.data) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            IDBrokerSummary: number
            Date: string
            IDFirm: string
            FirmName: string
            Value: number
            Volume: number
            Frequency: number
          }) => ({
            idBrokerSummary: item.IDBrokerSummary,
            date: new Date(item.Date),
            brokerCode: item.IDFirm,
            brokerName: item.FirmName,
            totalValue: item.Value,
            volume: item.Volume,
            frequency: item.Frequency
          })
        ),
        recordsTotal: rawResponse.recordsTotal
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch margin trading summary.
   * @param date - Date in YYYYMMDD format
   * @returns Margin summary records
   */
  async getMarginSummary(date: string): Promise<Types.MarginSummary[] | null> {
    await this.ensureSession()
    try {
      const url = `https://www.idx.co.id/primary/TradingSummary/GetMarginSummary?date=${date}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return rawResponse.data.map((item: { Efek: string; High: string }) => ({
        code: item.Efek,
        notes: item.High
      }))
    } catch {
      return null
    }
  }

  /**
   * Fetch stock trading summary.
   * @param date - Date in YYYYMMDD format
   * @returns Stock summary records
   */
  async getStockSummary(date: string): Promise<Types.StockSummary[] | null> {
    await this.ensureSession()
    try {
      const url = `https://www.idx.co.id/primary/TradingSummary/GetStockSummary?date=${date}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return rawResponse.data.map((item: { Code: string; Close: number; Change: number }) => ({
        code: item.Code,
        close: item.Close,
        change: item.Change
      }))
    } catch {
      return null
    }
  }

  /**
   * Fetch general trade summary.
   * @returns List of trade summary records
   */
  async getTradeSummary(): Promise<Types.TradeSummary[] | null> {
    await this.ensureSession()
    try {
      const response = await fetch('https://www.idx.co.id/primary/Home/GetTradeSummary?lang=id', {
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
          DESCRIPTION: string
          Volume: number
          Value: number
          Frequency: number
          Dates: string
        }) => ({
          description: item.DESCRIPTION,
          volume: item.Volume,
          value: item.Value,
          frequency: item.Frequency,
          date: item.Dates
        })
      )
    } catch {
      return null
    }
  }
}
