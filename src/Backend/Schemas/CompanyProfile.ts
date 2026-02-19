import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company profile schema.
 * @description Stores basic info for listed companies.
 */
export const companyProfile = sqliteTable('company_profile', {
  /** Company ticker identifier */
  code: text('code').primaryKey(),
  /** Full issuer company name */
  name: text('name').notNull(),
  /** Official shares listing date */
  listingDate: integer('listing_date', { mode: 'timestamp' })
})
