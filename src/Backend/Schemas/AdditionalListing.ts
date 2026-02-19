import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Additional listing shares schema.
 * @description Records of newly added company shares.
 */
export const additionalListing = sqliteTable('additional_listing', {
  /** Company ticker identifier */
  code: text('code').primaryKey(),
  /** Full issuer company name */
  name: text('name').notNull(),
  /** Total count of newly added shares */
  shares: integer('shares').notNull(),
  /** Listing mechanism category */
  type: text('type'),
  /** Official shares listing date */
  listingDate: integer('listing_date', { mode: 'timestamp' }).notNull()
})
