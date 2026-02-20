import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Issued history schema.
 * @description Record of company share issuance events.
 */
export const issuedHistory = sqliteTable('issued_history', {
  /** Internal record identifier from API */
  id: integer('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Recording or issuance date */
  date: text('date').notNull(),
  /** Issuance action category */
  type: text('type').notNull(),
  /** Number of shares issued in event */
  shares: integer('shares').notNull(),
  /** Total shares outstanding after action */
  totalShares: integer('total_shares').notNull()
})
