import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Index Summary schema.
 * @description Market index performance data with code/date composite key.
 */
export const indexSummary = sqliteTable('index_summary', {
  id: integer('id').primaryKey(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  previous: real('previous'),
  high: real('high'),
  low: real('low'),
  close: real('close'),
  change: real('change'),
  percent: real('percent'),
  volume: integer('volume'),
  value: real('value'),
  frequency: integer('frequency'),
  marketCap: real('market_cap')
})
