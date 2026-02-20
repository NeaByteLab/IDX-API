import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Daily index performance schema.
 * @description Time-series data for index closing prices.
 */
export const dailyIndex = sqliteTable('daily_index', {
  /** Composite identifier: name-date(unix) */
  id: text('id').primaryKey(),
  /** Official market index name */
  name: text('name').notNull(),
  /** Latest daily closing price */
  close: real('close').notNull(),
  /** Record statement date */
  date: integer('date').notNull(),
  /** Monthly period identifier */
  period: integer('period').notNull()
})
