import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company profile schema.
 * @description Stores basic information for listed companies.
 */
export const companyProfile = sqliteTable('company_profile', {
  code: text('code').primaryKey(),
  name: text('name').notNull(),
  listingDate: integer('listing_date', { mode: 'timestamp' })
})
