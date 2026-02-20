import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Index chart points schema.
 * @description Time-series data for technical charts.
 */
export const indexChart = sqliteTable('index_chart', {
  /** Composite identifier: code-date(unix) */
  id: text('id').primaryKey(),
  /** Identification code for the index */
  code: text('code').notNull(),
  /** Chart data point timestamp */
  date: integer('date').notNull(),
  /** Recorded numeric index value */
  value: real('value').notNull()
})
