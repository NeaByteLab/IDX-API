import type * as Types from '@app/Trading/Types.ts'
import BaseClient from '@app/Client.ts'

/**
 * Trading summaries module.
 * @description Handles broker, margin, stock, and bond summaries.
 */
export default class TradingModule extends BaseClient {
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
            id: item.IDBrokerSummary,
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
   * Fetch index trading summary.
   * @description Returns performance data for market indices with optional filtering.
   * @param date - Date in YYYYMMDD format
   * @param start - Start record index
   * @param length - Maximum record count
   * @returns Paginated index summary records
   */
  async getIndexSummary(
    date: string,
    start = 0,
    length = 9999
  ): Promise<Types.TradingResponse<Types.IndexSummary> | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/TradingSummary/GetIndexSummary?lang=id&date=${date}&start=${start}&length=${length}`
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
      return {
        data: rawResponse.data.map(
          (item: {
            IndexSummaryID: number
            IndexCode: string
            Date: string
            Previous: number
            Close: number
            Highest: number
            Lowest: number
            Change: number
            Volume: number
            Value: number
            Frequency: number
            MarketCapital: number
          }) => {
            const percent = item.Previous !== 0 ? (item.Change / item.Previous) * 100 : 0
            return {
              id: item.IndexSummaryID,
              code: item.IndexCode,
              name: item.IndexCode,
              date: new Date(item.Date),
              price: {
                previous: item.Previous,
                high: item.Highest,
                low: item.Lowest,
                close: item.Close,
                change: item.Change,
                percent: Number(percent.toFixed(2))
              },
              trading: {
                volume: item.Volume,
                value: item.Value,
                frequency: item.Frequency
              },
              marketCap: item.MarketCapital
            }
          }
        ),
        recordsTotal: rawResponse.recordsTotal
      }
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
      return rawResponse.data.map(
        (item: {
          IDStockSummary: number
          StockCode: string
          StockName: string
          Date: string
          Remarks: string
          OpenPrice: number
          High: number
          Low: number
          Close: number
          Previous: number
          Change: number
          Volume: number
          Value: number
          Frequency: number
          FirstTrade: number
          Bid: number
          BidVolume: number
          Offer: number
          OfferVolume: number
          ForeignBuy: number
          ForeignSell: number
          ListedShares: number
          TradebleShares: number
          WeightForIndex: number
          IndexIndividual: number
          DelistingDate: string
          NonRegularVolume: number
          NonRegularValue: number
          NonRegularFrequency: number
        }) => ({
          id: item.IDStockSummary,
          code: item.StockCode,
          name: item.StockName,
          date: new Date(item.Date),
          remarks: item.Remarks,
          price: {
            open: item.OpenPrice,
            high: item.High,
            low: item.Low,
            close: item.Close,
            previous: item.Previous,
            change: item.Change
          },
          trading: {
            volume: item.Volume,
            value: item.Value,
            frequency: item.Frequency,
            firstTrade: item.FirstTrade
          },
          orderBook: {
            bid: item.Bid,
            bidVolume: item.BidVolume,
            offer: item.Offer,
            offerVolume: item.OfferVolume
          },
          foreign: {
            buy: item.ForeignBuy,
            sell: item.ForeignSell,
            net: item.ForeignBuy - item.ForeignSell
          },
          shares: {
            listed: item.ListedShares,
            tradable: item.TradebleShares,
            weightForIndex: item.WeightForIndex,
            individualIndex: item.IndexIndividual
          },
          nonRegular: {
            volume: item.NonRegularVolume,
            value: item.NonRegularValue,
            frequency: item.NonRegularFrequency
          }
        })
      )
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
          id: item.DESCRIPTION,
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
