import BaseClient from '@app/Client.ts'
import type * as Types from '@app/Trading/Types.ts'

/**
 * Trading summaries module.
 * @description Handles broker, margin, stock, and bond summaries.
 */
export default class TradingModule extends BaseClient {
  /**
   * Fetch broker trading summary.
   * @description Returns paginated broker activity and trading summary.
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
      const response = await fetch(
        `https://www.idx.co.id/primary/TradingSummary/GetBrokerSummary?length=${length}&start=${start}&date=${date}`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
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
   * Fetch domestic investor daily trading summary.
   * @description Returns domestic investor daily trading activity metrics.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns Domestic investor trading records
   */
  async getDomesticTradingSummary(
    year: number,
    month: number
  ): Promise<Types.InvestorTradingSummary[] | null> {
    await this.ensureSession()
    try {
      const queryObj = {
        year: year.toString(),
        month: month.toString(),
        quarter: 0,
        type: 'monthly'
      }
      const queryBase64 = btoa(JSON.stringify(queryObj))
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_TABLE_DAILY_TRADING_INVESTOR_DOMESTIC&query=${queryBase64}&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return rawResponse.data.map(
        (item: {
          date: string
          domesticForeignVolume: number
          domesticForeignValue: number
          domesticForeignFreq: number
          domesticDomesticVolume: number
          domesticDomesticValue: number
          domesticDomesticFreq: number
        }) => ({
          date: item.date,
          buyVolume: item.domesticDomesticVolume + item.domesticForeignVolume,
          buyValue: item.domesticDomesticValue + item.domesticForeignValue,
          buyFrequency: item.domesticDomesticFreq + item.domesticForeignFreq,
          sellVolume: item.domesticDomesticVolume,
          sellValue: item.domesticDomesticValue,
          sellFrequency: item.domesticDomesticFreq
        })
      )
    } catch {
      return null
    }
  }

  /**
   * Fetch foreign investor daily trading summary.
   * @description Returns foreign investor daily trading activity metrics.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns Foreign investor trading records
   */
  async getForeignTradingSummary(
    year: number,
    month: number
  ): Promise<Types.InvestorTradingSummary[] | null> {
    await this.ensureSession()
    try {
      const queryObj = {
        year: year.toString(),
        month: month.toString(),
        quarter: 0,
        type: 'monthly'
      }
      const queryBase64 = btoa(JSON.stringify(queryObj))
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_TABLE_DAILY_TRADING_INVESTOR_FOREIGN&query=${queryBase64}&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return rawResponse.data.map(
        (item: {
          date: string
          foreignForeignVolume: number
          foreignForeignValue: number
          foreignForeignFreq: number
          foreignDomesticVolume: number
          foreignDomesticValue: number
          foreignDomesticFreq: number
        }) => ({
          date: item.date,
          buyVolume: item.foreignForeignVolume + item.foreignDomesticVolume,
          buyValue: item.foreignForeignValue + item.foreignDomesticValue,
          buyFrequency: item.foreignForeignFreq + item.foreignDomesticFreq,
          sellVolume: item.foreignForeignVolume,
          sellValue: item.foreignForeignValue,
          sellFrequency: item.foreignForeignFreq
        })
      )
    } catch {
      return null
    }
  }

  /**
   * Fetch index trading summary.
   * @description Returns performance data for market indices.
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
      const response = await fetch(
        `https://www.idx.co.id/primary/TradingSummary/GetIndexSummary?lang=id&date=${date}&start=${start}&length=${length}`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
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
   * Fetch industry trading summary.
   * @description Returns aggregate trading data classified by industry subset.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns List of industry trading summary records
   */
  async getIndustryTradingSummary(
    year: number,
    month: number
  ): Promise<Types.IndustryTradingSummary[] | null> {
    await this.ensureSession()
    try {
      const queryObj = {
        year: year.toString(),
        month: month.toString(),
        quarter: 0,
        type: 'monthly'
      }
      const queryBase64 = btoa(JSON.stringify(queryObj))
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_LIST_TRADING_SUMMARY_INDUSTRY_CLASSIFICATION&query=${queryBase64}&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      const results: Types.IndustryTradingSummary[] = []
      interface RawIndustryItem {
        Date: string
        Name: string
        Shares: number
        MCap: number
        Volume: number
        Value: number
        Freq: number
        PER: number
        PBV: number
        Members: number
        months?: RawIndustryItem[]
      }
      const flatten = (items: RawIndustryItem[]) => {
        for (const item of items) {
          results.push({
            date: item.Date,
            industry: item.Name,
            shares: item.Shares,
            marketCap: item.MCap,
            volume: item.Volume,
            value: item.Value,
            frequency: item.Freq,
            per: item.PER,
            pbv: item.PBV,
            members: item.Members
          })
          if (Array.isArray(item.months) && item.months.length > 0) {
            flatten(item.months)
          }
        }
      }
      flatten(rawResponse.data as RawIndustryItem[])
      return results
    } catch {
      return null
    }
  }

  /**
   * Fetch most active stocks by frequency.
   * @description Returns paginated list of top active stocks by frequency.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns Active stock response
   */
  async getMostActiveByFrequency(
    year: number,
    month: number
  ): Promise<Types.ActiveStockResponse | null> {
    await this.ensureSession()
    try {
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_MOST_ACTIVE_STOCK_FREQ&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        totalValue: rawResponse.TotalValue,
        totalVolume: rawResponse.TotalVolume,
        totalFreq: rawResponse.TotalFreq,
        data: rawResponse.data.map(
          (item: {
            Code: string
            StockName: string
            Volume: number
            Value: number
            Freq: number
            VolumePercent: number
            ValuePercent: number
            FreqPercent: number
            TradingDays: number
          }) => ({
            code: item.Code,
            name: item.StockName,
            volume: item.Volume,
            value: item.Value,
            frequency: item.Freq,
            volumePercent: item.VolumePercent,
            valuePercent: item.ValuePercent,
            freqPercent: item.FreqPercent,
            tradingDays: item.TradingDays
          })
        )
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch most active stocks by value.
   * @description Returns paginated list of top active stocks by value.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns Active stock response
   */
  async getMostActiveByValue(
    year: number,
    month: number
  ): Promise<Types.ActiveStockResponse | null> {
    await this.ensureSession()
    try {
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_MOST_ACTIVE_STOCK_VALUE&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        totalValue: rawResponse.TotalValue,
        totalVolume: rawResponse.TotalVolume,
        totalFreq: rawResponse.TotalFreq,
        data: rawResponse.data.map(
          (item: {
            Code: string
            StockName: string
            Volume: number
            Value: number
            Freq: number
            VolumePercent: number
            ValuePercent: number
            FreqPercent: number
            TradingDays: number
          }) => ({
            code: item.Code,
            name: item.StockName,
            volume: item.Volume,
            value: item.Value,
            frequency: item.Freq,
            volumePercent: item.VolumePercent,
            valuePercent: item.ValuePercent,
            freqPercent: item.FreqPercent,
            tradingDays: item.TradingDays
          })
        )
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch most active stocks by volume.
   * @description Returns paginated list of top active stocks by volume.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns Active stock response
   */
  async getMostActiveByVolume(
    year: number,
    month: number
  ): Promise<Types.ActiveStockResponse | null> {
    await this.ensureSession()
    try {
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_MOST_ACTIVE_STOCK_VOLUME&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        totalValue: rawResponse.TotalValue,
        totalVolume: rawResponse.TotalVolume,
        totalFreq: rawResponse.TotalFreq,
        data: rawResponse.data.map(
          (item: {
            Code: string
            StockName: string
            Volume: number
            Value: number
            Freq: number
            VolumePercent: number
            ValuePercent: number
            FreqPercent: number
            TradingDays: number
          }) => ({
            code: item.Code,
            name: item.StockName,
            volume: item.Volume,
            value: item.Value,
            frequency: item.Freq,
            volumePercent: item.VolumePercent,
            valuePercent: item.ValuePercent,
            freqPercent: item.FreqPercent,
            tradingDays: item.TradingDays
          })
        )
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch stock trading summary.
   * @description Comprehensive stock summaries with OHLC data.
   * @param date - Date in YYYYMMDD format
   * @returns Stock summary records
   */
  async getStockSummary(date: string): Promise<Types.StockSummary[] | null> {
    await this.ensureSession()
    try {
      const response = await fetch(
        `https://www.idx.co.id/primary/TradingSummary/GetStockSummary?date=${date}`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
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
   * Fetch top gainer stocks.
   * @description Returns list of top 20 gaining stocks.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns List of top stock summary records
   */
  async getTopGainers(year: number, month: number): Promise<Types.TopStockSummary[] | null> {
    await this.ensureSession()
    try {
      const queryObj = {
        year: year.toString(),
        month: month.toString(),
        quarter: 0,
        type: 'monthly'
      }
      const queryBase64 = btoa(JSON.stringify(queryObj))
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_TOP_GAINER&query=${queryBase64}&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return rawResponse.data.map(
        (item: {
          Code: string
          StockName: string
          prevValue: number
          prevValueCA: number
          closeValue: number
          dilution: number
          changePrice: number
          changePercentage: number
        }) => ({
          code: item.Code,
          name: item.StockName,
          previous: item.prevValue,
          previousCA: item.prevValueCA,
          close: item.closeValue,
          dilution: item.dilution,
          change: item.changePrice,
          percentage: item.changePercentage
        })
      )
    } catch {
      return null
    }
  }

  /**
   * Fetch top loser stocks.
   * @description Returns list of top 20 losing stocks.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns List of top stock summary records
   */
  async getTopLosers(year: number, month: number): Promise<Types.TopStockSummary[] | null> {
    await this.ensureSession()
    try {
      const queryObj = {
        year: year.toString(),
        month: month.toString(),
        quarter: 0,
        type: 'monthly'
      }
      const queryBase64 = btoa(JSON.stringify(queryObj))
      const response = await fetch(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_TOP_LOSER&query=${queryBase64}&isPrint=False&cumulative=false`,
        {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        }
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return rawResponse.data.map(
        (item: {
          Code: string
          StockName: string
          prevValue: number
          prevValueCA: number
          closeValue: number
          dilution: number
          changePrice: number
          changePercentage: number
        }) => ({
          code: item.Code,
          name: item.StockName,
          previous: item.prevValue,
          previousCA: item.prevValueCA,
          close: item.closeValue,
          dilution: item.dilution,
          change: item.changePrice,
          percentage: item.changePercentage
        })
      )
    } catch {
      return null
    }
  }

  /**
   * Fetch general trade summary.
   * @description General market segment trading aggregate data.
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
