import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Active stocks by volume schema.
 * @description Ranks stocks based on traded volume.
 */
export const activeVolume = sqliteTable('active_volume', {
  /** Composite identifier: code-date(unix) */
  id: text('id').primaryKey(),
  /** Stock ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name'),
  /** Recorded trade volume count */
  volume: integer('volume'),
  /** Recorded total numeric trade value */
  value: real('value'),
  /** Total recorded trade frequency count */
  frequency: integer('frequency'),
  /** Share of volume per market percentage */
  volumePercent: real('volume_percent'),
  /** Share of value per market percentage */
  valuePercent: real('value_percent'),
  /** Share of frequency per market percentage */
  frequencyPercent: real('frequency_percent'),
  /** Active trading days count */
  tradingDays: integer('trading_days')
})
