import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Trading daily schema.
 * @description Flattened daily trading snapshot for a stock.
 */
export const tradingDaily = sqliteTable('trading_daily', {
  /** Internal summary identifier */
  id: integer('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Board category */
  board: text('board'),
  /** Previous record closing price */
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
  /** Best buyer bid price */
  bid: real('bid'),
  /** Volume at bid price */
  bidVolume: integer('bid_volume'),
  /** Best seller offer price */
  offer: real('offer'),
  /** Volume at offer price */
  offerVolume: integer('offer_volume'),
  /** Individual company price index */
  individualIndex: real('individual_index'),
  /** Percentage of foreign share ownership */
  foreignShares: real('foreign_shares'),
  /** Last update timestamp */
  updatedAt: text('updated_at')
})
