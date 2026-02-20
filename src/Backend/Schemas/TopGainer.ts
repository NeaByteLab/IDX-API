import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Top gainer stocks schema.
 * @description Stores daily top 20 stock gainers.
 */
export const topGainer = sqliteTable('top_gainer', {
  /** Composite identifier: code-date(unix) */
  id: text('id').primaryKey(),
  /** Stock ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name'),
  /** Previous trading day closing price */
  previous: real('previous'),
  /** Adjusted previous close price */
  previousCa: real('previous_ca'),
  /** Current trading day closing price */
  close: real('close'),
  /** Applied dilution factor */
  dilution: real('dilution'),
  /** Absolute price change value */
  change: real('change'),
  /** Percentage price change value */
  percentage: real('percentage'),
  /** Monthly period identifier */
  period: integer('period').notNull()
})
