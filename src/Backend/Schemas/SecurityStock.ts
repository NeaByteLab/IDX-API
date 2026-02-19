import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Security stock list schema.
 * @description Master database of listed security stocks.
 */
export const securityStock = sqliteTable('security_stock', {
  /** Company ticker identifier */
  code: text('code').primaryKey(),
  /** Full issuer company name */
  name: text('name').notNull(),
  /** Total number of listed shares */
  shares: integer('shares'),
  /** Target listing board category */
  listingBoard: text('listing_board'),
  /** Initial listing timestamp */
  listingDate: integer('listing_date', { mode: 'timestamp' })
})
