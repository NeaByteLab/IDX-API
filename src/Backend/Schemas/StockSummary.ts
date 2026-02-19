import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Stock Summary schema.
 * @description Daily stock data with flattened structure for SQL.
 */
export const stockSummary = sqliteTable('stock_summary', {
  id: integer('id').primaryKey(),
  code: text('code').notNull(),
  name: text('name'),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  remarks: text('remarks'),
  open: real('open'),
  high: real('high'),
  low: real('low'),
  close: real('close'),
  previous: real('previous'),
  change: real('change'),
  volume: integer('volume'),
  value: real('value'),
  frequency: integer('frequency'),
  firstTrade: real('first_trade'),
  bid: real('bid'),
  bidVolume: integer('bid_volume'),
  offer: real('offer'),
  offerVolume: integer('offer_volume'),
  foreignBuy: integer('foreign_buy'),
  foreignSell: integer('foreign_sell'),
  foreignNet: integer('foreign_net'),
  listedShares: integer('listed_shares'),
  tradableShares: integer('tradable_shares'),
  weightForIndex: real('weight_for_index'),
  individualIndex: real('individual_index'),
  nonRegularVolume: integer('non_regular_volume'),
  nonRegularValue: real('non_regular_value'),
  nonRegularFrequency: integer('non_regular_frequency')
})
