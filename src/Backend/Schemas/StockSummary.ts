import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Stock summary schema.
 * @description Daily stock data with flattened structure.
 */
export const stockSummary = sqliteTable('stock_summary', {
  /** Internal record identifier */
  id: integer('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name'),
  /** Record statement date identification */
  date: integer('date').notNull(),
  /** Trading state special remarks */
  remarks: text('remarks'),
  /** Daily opening price value */
  open: real('open'),
  /** Peak daily price value */
  high: real('high'),
  /** Bottom daily price value */
  low: real('low'),
  /** Final closing price value */
  close: real('close'),
  /** Previous record closing price */
  previous: real('previous'),
  /** Absolute daily price change */
  change: real('change'),
  /** Aggregate daily trade volume */
  volume: integer('volume'),
  /** Aggregate daily trade value */
  value: real('value'),
  /** Total daily trade frequency */
  frequency: integer('frequency'),
  /** Opening trade price record */
  firstTrade: real('first_trade'),
  /** Best buyer bid price */
  bid: real('bid'),
  /** Volume at bid price */
  bidVolume: integer('bid_volume'),
  /** Best seller offer price */
  offer: real('offer'),
  /** Volume at offer price */
  offerVolume: integer('offer_volume'),
  /** Foreign investor buy count */
  foreignBuy: integer('foreign_buy'),
  /** Foreign investor sell count */
  foreignSell: integer('foreign_sell'),
  /** Foreign investor net position */
  foreignNet: integer('foreign_net'),
  /** Total company listed shares */
  listedShares: integer('listed_shares'),
  /** Volume of tradable shares */
  tradableShares: integer('tradable_shares'),
  /** Index weight calculation factor */
  weightForIndex: real('weight_for_index'),
  /** Individual company price index */
  individualIndex: real('individual_index'),
  /** Negotiation board trade volume */
  nonRegularVolume: integer('non_regular_volume'),
  /** Negotiation board trade value */
  nonRegularValue: real('non_regular_value'),
  /** Negotiation board trade frequency */
  nonRegularFrequency: integer('non_regular_frequency')
})
