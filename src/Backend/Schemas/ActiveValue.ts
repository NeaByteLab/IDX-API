import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Active stocks by value schema.
 * @description Ranks stocks based on trading value.
 */
export const activeValue = sqliteTable('active_value', {
  /** Composite identifier: code-date(unix) */
  id: text('id').primaryKey(),
  /** Stock ticker identifier */
  code: text('code').notNull(),
  /** Issuer company name */
  name: text('name'),
  /** Total trade volume */
  volume: integer('volume'),
  /** Total numeric trade value */
  value: real('value'),
  /** Total trade frequency count */
  frequency: integer('frequency'),
  /** Volume market share percentage */
  volumePercent: real('volume_percent'),
  /** Value market share percentage */
  valuePercent: real('value_percent'),
  /** Frequency market share percentage */
  frequencyPercent: real('frequency_percent'),
  /** Numeric active trading days */
  tradingDays: integer('trading_days'),
  /** Monthly period identifier */
  period: integer('period').notNull()
})
