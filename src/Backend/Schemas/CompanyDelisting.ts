import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company delisting schema.
 * @description Records of companies removed from exchange.
 */
export const companyDelisting = sqliteTable('company_delisting', {
  /** Record identifier (code-delistingDate) */
  id: text('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name').notNull(),
  /** Total listed shares at delisting */
  listedShares: real('listed_shares').notNull(),
  /** Final market capitalization */
  marketCap: real('market_cap').notNull(),
  /** Final regular market price */
  regularPrice: real('regular_price').notNull(),
  /** Last active trading date */
  lastDate: integer('last_date').notNull(),
  /** Initial listing date */
  listingDate: integer('listing_date'),
  /** Official delisting date */
  delistingDate: integer('delisting_date').notNull(),
  /** Monthly period identifier */
  period: integer('period').notNull()
})
