import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Additional listing shares schema.
 * @description Records of newly added company shares.
 */
export const additionalListing = sqliteTable('additional_listing', {
  /** Composite identifier: code-startDate(unix) */
  id: text('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name').notNull(),
  /** Total count of newly added shares */
  shares: integer('shares').notNull(),
  /** Listing mechanism category */
  type: text('type'),
  /** Effective listing date */
  startDate: integer('start_date').notNull(),
  /** End of listing period */
  lastDate: integer('last_date').notNull(),
  /** Monthly period identifier */
  period: integer('period').notNull()
})
