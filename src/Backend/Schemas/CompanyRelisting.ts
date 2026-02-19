import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company relisting schema.
 * @description Records of company relisting events.
 */
export const companyRelisting = sqliteTable('company_relisting', {
  /** Company ticker identifier */
  code: text('code').primaryKey(),
  /** Full issuer company name */
  name: text('name').notNull(),
  /** Official relisting date */
  listingDate: integer('listing_date', { mode: 'timestamp' }).notNull()
})
