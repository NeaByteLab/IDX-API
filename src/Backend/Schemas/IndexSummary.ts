import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Index summary schema.
 * @description Market index performance data with composite key.
 */
export const indexSummary = sqliteTable('index_summary', {
  /** Internal record identifier */
  id: integer('id').primaryKey(),
  /** Official market index code */
  code: text('code').notNull(),
  /** Official market index name */
  name: text('name').notNull(),
  /** Record statement date identification */
  date: integer('date').notNull(),
  /** Previous closing index value */
  previous: real('previous'),
  /** Peak daily index value */
  high: real('high'),
  /** Bottom daily index value */
  low: real('low'),
  /** Final closing index value */
  close: real('close'),
  /** Absolute index change value */
  change: real('change'),
  /** Percentage index change value */
  percent: real('percent'),
  /** Aggregate daily trade volume */
  volume: integer('volume'),
  /** Aggregate daily trade value */
  value: real('value'),
  /** Total daily trade frequency */
  frequency: integer('frequency'),
  /** Total numeric market capitalization */
  marketCap: real('market_cap')
})
