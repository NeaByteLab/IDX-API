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
 * Generic trading response wrapper.
 * @description Standard structure for paginated trading data results.
 */
export interface TradingResponse<T> {
  /** List of trading records */
  data: T[]
  /** Total record count */
  recordsTotal: number
}
