import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Active stocks by frequency schema.
 * @description Ranks stocks based on total frequency.
 */
export const activeFrequency = sqliteTable('active_frequency', {
  /** Composite identifier: code-date(unix) */
  id: text('id').primaryKey(),
  /** Stock ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name'),
  /** Aggregated trade volume */
  volume: integer('volume'),
  /** Aggregated trade value */
  value: real('value'),
  /** Total recorded trade frequency */
  frequency: integer('frequency'),
  /** Share of total market volume percentage */
  volumePercent: real('volume_percent'),
  /** Share of total market value percentage */
  valuePercent: real('value_percent'),
  /** Share of total market frequency percentage */
  frequencyPercent: real('frequency_percent'),
  /** Count of active trading days */
  tradingDays: integer('trading_days')
})
