import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company dividend announcement schema.
 * @description Tracks dividend distribution schedules and amounts.
 */
export const companyDividend = sqliteTable('company_dividend', {
  /** Composite identifier: code-recordDate(unix) */
  id: text('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name'),
  /** Numeric dividend value per share */
  cashDividend: real('cash_dividend').notNull(),
  /** Cum-dividend cutoff date */
  cumDividend: integer('cum_dividend', { mode: 'timestamp' }),
  /** Ex-dividend trading date */
  exDividend: integer('ex_dividend', { mode: 'timestamp' }),
  /** Shareholders recording date */
  recordDate: integer('record_date', { mode: 'timestamp' }),
  /** Official distribution payment date */
  paymentDate: integer('payment_date', { mode: 'timestamp' })
})
