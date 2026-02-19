import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company delisting schema.
 * @description Records of companies removed from exchange.
 */
export const companyDelisting = sqliteTable('company_delisting', {
  /** Company ticker identifier */
  code: text('code').primaryKey(),
  /** Full issuer company name */
  name: text('name').notNull(),
  /** Initial listing date */
  listingDate: integer('listing_date', { mode: 'timestamp' }),
  /** Official delisting date */
  delistingDate: integer('delisting_date', { mode: 'timestamp' }).notNull()
})
