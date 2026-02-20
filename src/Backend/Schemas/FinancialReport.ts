import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Financial report schema.
 * @description Stores metadata and attachments for company financial reports.
 */
export const financialReport = sqliteTable('financial_report', {
  /** Composite key or unique identifier string */
  id: text('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name'),
  /** Report fiscal year */
  year: integer('year').notNull(),
  /** Fiscal period (TW1, TW2, TW3, audit) */
  period: text('period').notNull(),
  /** JSON string of file attachments */
  attachments: text('attachments')
})
