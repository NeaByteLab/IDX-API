/**
 * Top active stock response.
 * @description Wrapper for most active stock lists.
 */
export interface ActiveStockResponse {
  /** Total market value */
  totalValue: number
  /** Total market volume */
  totalVolume: number
  /** Total market frequency */
  totalFreq: number
  /** List of top active stocks */
  data: ActiveStockSummary[]
}

/**
 * Top active stock summary.
 * @description Structure for most active stock lists.
 */
export interface ActiveStockSummary {
  /** Stock ticker code */
  code: string
  /** Stock company name */
  name: string
  /** Total trading volume */
  volume: number
  /** Total trading value */
  value: number
  /** Trading frequency */
  frequency: number
  /** Volume percentage of total market */
  volumePercent: number
  /** Value percentage of total market */
  valuePercent: number
  /** Frequency percentage of total market */
  freqPercent: number
  /** Trading days */
  tradingDays: number
}

/**
 * Broker trading summary structure.
 * @description Defines fields for broker-specific trading volume.
 */
export interface BrokerSummary {
  /** Unique IDX record identifier */
  id: number
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
 * Index trading summary structure.
 * @description Defines fields for market index trading performance.
 */
export interface IndexSummary {
  /** Index record identification */
  id: number
  /** Index identification code */
  code: string
  /** Registered index name */
  name: string
  /** Summary statement date */
  date: Date
  /** Price Data OHLC */
  price: {
    /** Previous close */
    previous: number
    /** High price */
    high: number
    /** Low price */
    low: number
    /** Close price */
    close: number
    /** Absolute price change */
    change: number
    /** Percentage price change */
    percent: number
  }
  /** Trading activity results */
  trading: {
    /** Aggregate trade volume */
    volume: number
    /** Aggregate trade value */
    value: number
    /** Total trade frequency */
    frequency: number
  }
  /** Specific market cap data */
  marketCap: number
}

/**
 * Industry trading summary.
 * @description Structure for trading data aggregated by industry.
 */
export interface IndustryTradingSummary {
  /** Record date */
  date: string
  /** Industry or sector specification */
  industry: string
  /** Number of listed shares */
  shares: number
  /** Market capitalization in million IDR */
  marketCap: number
  /** Total trading volume in thousand shares */
  volume: number
  /** Total trading value in million IDR */
  value: number
  /** Total trading frequency */
  frequency: number
  /** Price to Earnings Ratio */
  per: number
  /** Price to Book Value */
  pbv: number
  /** Number of member companies */
  members: number
}

/**
 * Foreign/Domestic daily trading summary.
 * @description Structure for investor type daily transactions.
 */
export interface InvestorTradingSummary {
  /** Record date */
  date: string
  /** Buy volume by selected investor type */
  buyVolume: number
  /** Buy value by selected investor type */
  buyValue: number
  /** Buy frequency by selected investor type */
  buyFrequency: number
  /** Sell volume by selected investor type */
  sellVolume: number
  /** Sell value by selected investor type */
  sellValue: number
  /** Sell frequency by selected investor type */
  sellFrequency: number
}

/**
 * Stock trading summary structure.
 * @description Daily stock data with nested domain.
 */
export interface StockSummary {
  /** Summary identification */
  id: number
  /** Stock ticker code */
  code: string
  /** Listed company name */
  name: string
  /** Summary date */
  date: Date
  /** Remarks code string */
  remarks: string
  /** Price Data OHLC */
  price: {
    /** Open price */
    open: number
    /** High price */
    high: number
    /** Low price */
    low: number
    /** Close price */
    close: number
    /** Previous close */
    previous: number
    /** Price change */
    change: number
  }
  /** Trading activity data */
  trading: {
    /** Total volume */
    volume: number
    /** Total value */
    value: number
    /** Total frequency */
    frequency: number
    /** First trade price */
    firstTrade: number
  }
  /** Order book summary */
  orderBook: {
    /** Best bid price */
    bid: number
    /** Best bid volume */
    bidVolume: number
    /** Best offer price */
    offer: number
    /** Best offer volume */
    offerVolume: number
  }
  /** Foreign investor flow */
  foreign: {
    /** Foreign buy volume */
    buy: number
    /** Foreign sell volume */
    sell: number
    /** Net foreign volume */
    net: number
  }
  /** Share statistics breakdown */
  shares: {
    /** Total listed shares */
    listed: number
    /** Total tradable shares */
    tradable: number
    /** Index weight */
    weightForIndex: number
    /** Individual index */
    individualIndex: number
  }
  /** Non-regular market data */
  nonRegular: {
    /** Non-regular volume */
    volume: number
    /** Non-regular value */
    value: number
    /** Non-regular frequency */
    frequency: number
  }
}

/**
 * Top gainer/loser stock summary.
 * @description Structure for top moving stocks.
 */
export interface TopStockSummary {
  /** Stock ticker code */
  code: string
  /** Stock company name */
  name: string
  /** Previous close price */
  previous: number
  /** Previous price adjusted for corporate action */
  previousCA: number
  /** Current close price */
  close: number
  /** Dilution factor */
  dilution: number
  /** Price change value */
  change: number
  /** Price change percentage */
  percentage: number
}

/**
 * General trade summary structure.
 * @description Defines fields for market segment trading data.
 */
export interface TradeSummary {
  /** Market segment identifier */
  id: string
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
 * Daily trading snapshot for a stock.
 * @description Detailed price and volume data for a trading day.
 */
export interface TradingInfoDaily {
  /** Summary record ID */
  id: number
  /** Stock ticker code */
  code: string
  /** Market board identifier */
  board: string
  /** Price movement data */
  price: {
    /** Previous closing price */
    previous: number
    /** Opening price */
    open: number
    /** Highest price of the day */
    high: number
    /** Lowest price of the day */
    low: number
    /** Current closing price */
    close: number
    /** Price change amount */
    change: number
  }
  /** Trading activity metrics */
  trading: {
    /** Total trading volume */
    volume: number
    /** Total trading value */
    value: number
    /** Transaction frequency */
    frequency: number
  }
  /** Limit order book status */
  orderBook: {
    /** Best bid price */
    bid: number
    /** Best bid volume */
    bidVolume: number
    /** Best offer price */
    offer: number
    /** Best offer volume */
    offerVolume: number
  }
  /** Market statistics and ownership */
  market: {
    /** Stock individual index */
    individualIndex: number
    /** Number of foreign shares */
    foreignShares: number
  }
  /** Server modification timestamp */
  updatedAt: string
}

/**
 * Historical stock summary record.
 * @description Detailed historical trading summary data for a stock.
 */
export interface TradingInfoSS {
  /** Sequence number */
  no: number
  /** Summary record ID */
  id: number
  /** Ticker code identifier */
  code: string
  /** Issuer company name */
  name: string
  /** Record statement date */
  date: string
  /** Price movement data */
  price: {
    /** Previous closing price */
    previous: number
    /** Adjusted previous price */
    previousAdjusted: number
    /** Opening price */
    open: number
    /** Highest price of the day */
    high: number
    /** Lowest price of the day */
    low: number
    /** Current closing price */
    close: number
    /** Price change amount */
    change: number
  }
  /** Trading activity metrics */
  trading: {
    /** Total trading volume */
    volume: number
    /** Total trading value */
    value: number
    /** Transaction frequency */
    frequency: number
    /** First trade price */
    firstTrade: number
  }
  /** Order book quotes */
  orderBook: {
    /** Best bid price */
    bid: number
    /** Best bid volume */
    bidVolume: number
    /** Best offer price */
    offer: number
    /** Best offer volume */
    offerVolume: number
  }
  /** Share statistics */
  shares: {
    /** Total listed shares */
    listed: number
    /** Total tradable shares */
    tradable: number
    /** Index weight coefficient */
    weightForIndex: number
    /** Individual performance index */
    individualIndex: number
  }
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
