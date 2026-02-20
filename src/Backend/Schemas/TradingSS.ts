import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Trading SS schema.
 * @description Flattened historical daily stock summary records.
 */
export const tradingSS = sqliteTable('trading_ss', {
  /** Internal summary identifier */
  id: integer('id').primaryKey(),
  /** Sequential record number */
  no: integer('no'),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name'),
  /** Record statement date */
  date: text('date').notNull(),
  /** Previous closing price */
  previous: real('previous'),
  /** Daily opening price */
  open: real('open'),
  /** Peak daily price */
  high: real('high'),
  /** Bottom daily price */
  low: real('low'),
  /** Final closing price */
  close: real('close'),
  /** Price change value */
  change: real('change'),
  /** Aggregate trading volume */
  volume: integer('volume'),
  /** Aggregate trading value */
  value: real('value'),
  /** Aggregate trading frequency */
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
  /** Total shares listed */
  listedShares: integer('listed_shares'),
  /** Volume of tradable shares */
  tradableShares: integer('tradable_shares'),
  /** Index weight calculation factor */
  weightForIndex: real('weight_for_index'),
  /** Individual company price index */
  individualIndex: real('individual_index')
})
